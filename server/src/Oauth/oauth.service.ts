import {HttpService} from '@nestjs/axios';
import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {env} from 'process';
import {ProviderService} from 'src/providers/provider.service';
import {UserService} from 'src/user/user.service';
import {from} from 'rxjs';
import {AreaStatusType} from 'src/types/status';
import {TwitchStrategy} from './twitch/twitch.strategy';

@Injectable()
export class OAuthService {
    constructor(
        private userService: UserService,
        private providerService: ProviderService,
        private httpService: HttpService,
        private twitchService: TwitchStrategy,
    ) {}

    async login(user) {
        return 'login ok ! User = ' + JSON.stringify(user);
    }

    async loggingWithGoogle(userData, body?) {
        console.log(userData.user);
        if (!userData.user) throw new BadRequestException();
        if (body) {
            let users = await this.userService.users({where: {email: userData.user.email}});
            let user = users[0];
            console.log(userData.user.id);
            if (user) {
                try {
                    this.providerService.updateUserToken(user.ID, 'google', userData.user.accessToken, userData.user.refreshToken);
                    return userData.user;
                } catch (error) {
                    throw new Error(error);
                }
            } else {
                //if(cookie) {...}
                const userAccount = userData.user;
                const newUser = await this.userService.createUser({
                    email: userAccount.email,
                    customToken: '',
                    googleID: userAccount.id,
                    password: userAccount.id,
                });
                if (newUser) {
                    try {
                        this.providerService.updateUserToken(newUser.ID, 'google', userData.user.accessToken, userData.user.refreshToken);
                        return userData.user;
                    } catch (error) {
                        throw new Error(error);
                    }
                }
            }
        }
    }

    async refreshGoogleToken(userID: number): Promise<AreaStatusType> {
        if (!userID) {
            throw new HttpException('No userID provided', HttpStatus.BAD_REQUEST);
        }

        const providerData = (await this.providerService.getUserProviders({where: {userID: userID, Name: 'google'}})).find(Boolean);
        if (!providerData) {
            throw new HttpException('No provider found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const result = await this.httpService
                .post('https://www.googleapis.com/oauth2/v4/token', {
                    client_id: env.GOOGLE_CLIENT_ID,
                    client_secret: env.GOOGLE_CLIENT_SECRET,
                    refresh_token: providerData.refreshToken,
                    grant_type: 'refresh_token',
                })
                .toPromise();
            await this.providerService.updateUserToken(userID, 'google', result.data.access_token);
            return {message: 'User Access Token refreshed', status: HttpStatus.OK, error: false};
        } catch (err) {
            throw new HttpException('An error occured : ' + err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async refreshUserAccessToken(userID: number, provider: string): Promise<AreaStatusType> {
        switch (provider) {
            case 'google':
                return await this.refreshGoogleToken(userID);
            case 'twitch':
                return await this.twitchService.refreshToken(userID);
            default:
                return {error: true, status: HttpStatus.BAD_REQUEST, message: `No method for the requested provider ${provider} found`};
        }
    }
}
