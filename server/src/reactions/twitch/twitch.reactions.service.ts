import {HttpService} from '@nestjs/axios';
import {HttpException, Injectable} from '@nestjs/common';
import {catchError} from 'rxjs';
import {OAuthService} from 'src/Oauth/oauth.service';
import {ProviderService} from 'src/providers/provider.service';

@Injectable()
export class TwitchReactionsService {
    constructor(
        private readonly http: HttpService,
        private readonly providersService: ProviderService,
        private oauthService: OAuthService,
    ) {}

    async buildSendWhisperMessage(req: any, body: {from: string; to: string; message: string}) {
        await this.oauthService.refreshUserAccessToken(req.user.ID, 'twitch');
        let userProvider = await this.providersService.getUserProviders({where: {userID: req.user.ID, Name: 'twitch'}});
        let accessToken = userProvider[0].accessToken;
        const userRes = await this.http
            .get(`https://api.twitch.tv/helix/users?login=${body.from}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                },
            })
            .toPromise();
        const userID = userRes.data.data[0].id;
        const toRes = await this.http
            .get(`https://api.twitch.tv/helix/users?login=${body.to}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                },
            })
            .toPromise();
        const toID = toRes.data.data[0].id;

        const res = await this.http
            .post(
                `https://api.twitch.tv/helix/whispers?from_user_id=${userID}&to_user_id=${toID}`,
                {
                    message: body.message,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Client-ID': process.env.TWITCH_CLIENT_ID,
                    },
                },
            )
            .pipe(
                catchError((err) => {
                    console.log(err);
                    return err;
                }),
            );

        return res;
    }
}
