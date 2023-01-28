import {Body, Controller, Get, Param, Req, Request, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from 'src/auth/auth.service';
import {UserService} from 'src/user/user.service';
import {OAuthService} from './oauth.service';
import {ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';
import {TwitchStrategy} from './twitch/twitch.strategy';
import {AreaStatusType} from 'src/types/status';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {ServicesService} from 'src/services/services.service';

@Controller('auth')
@ApiTags('Oauth routes')
export class OAuthController {
    constructor(
        private oauthService: OAuthService,
        private userService: UserService,
        private authService: AuthService,
        private twitchService: TwitchStrategy,
        private servicesService: ServicesService,
    ) {}

    @UseGuards(AuthGuard('google'))
    @Get('google')
    @ApiOperation({description: 'This route is used to login with google or register it as a provider', summary: 'login with google'})
    async loginWithGoogle() {
        console.log('someone is trying to login with google');
    }

    @UseGuards(AuthGuard('google-provider'))
    @Get('google/provider')
    @ApiOperation({description: 'This route is used to get provider from google', summary: 'provider with google'})
    async provWithGoogle() {
        console.log('someone is trying to prov with google');
    }

    @UseGuards(AuthGuard('google'))
    @Get('google/redirect')
    @ApiOperation({description: 'This route is the callback of the auth/google route', summary: 'login with google callback'})
    async loginWithGoogleRedirect(@Req() req, @Res() res, @Body() body?: {email: string}) {
        if (req.user.state) {
            console.log('using state');
            res.redirect(
                (process.env.CLIENT_URL || 'http://localhost:8081') +
                    '/services?token=' +
                    req.user.accessToken +
                    '&provider=google&refresh=' +
                    req.user.refreshToken,
            );
        }
        const user = await this.oauthService.loggingWithGoogle(req, body);
        if (user) {
            console.log('using user');
            const user = await this.userService.users({where: {email: body.email}});
            const jwt = await this.authService.loginUser(user[user.length - 1]);
            res.redirect(`${process.env.CLIENT_URL}/Areas?jwt=` + jwt.access_token);
        }
    }

    @Get('twitch/:jwt/provider')
    @ApiOperation({description: 'This route is used to login with twitch or register it as a provider', summary: 'login with twitch'})
    async loginTwitch(@Request() req, @Res() res, @Param('jwt') jwt: string) {
        console.log('someone is trying to login with twitch');
        const ID = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString()).sub;
        const url = await this.twitchService.getTwitchCodeUrl(ID);
        res.redirect(url);
    }

    @Get('twitch/redirect')
    @ApiOperation({description: 'This route is the callback of the auth/twitch route', summary: 'login with twitch callback'})
    async loginWithTwitchRedirect(@Req() req, @Res() res): Promise<AreaStatusType> {
        if (!req.query.code) return;
        const userId = parseInt(req.query.state);
        const callres = await this.twitchService.getTwitchToken(req.query.code);

        if (!callres.access_token || !callres.refresh_token)
            return {
                error: true,
                message: 'Something went wrong with the twitch login',
                status: 500,
            };

        const {access_token, refresh_token} = callres;
        await this.twitchService.updateUserToken(userId, access_token, refresh_token);

        try {
            await this.servicesService.subscribe(5, {user: {ID: userId}});
        } catch (e) {
            console.log(e);
        }

        res.redirect(`${process.env.CLIENT_URL}/services?provider=twitch`);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':provider/refresh')
    @ApiOperation({description: 'This route is used to refresh a User Access Token', summary: 'refresh access token'})
    @ApiBody({
        schema: {
            properties: {userID: {type: 'number'}},
        },
    })
    async refreshAccessToken(@Body() body: {userID: number}, @Param('provider') provider: string) {
        return await this.oauthService.refreshUserAccessToken(body.userID, provider);
    }
}
