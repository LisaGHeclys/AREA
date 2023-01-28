import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {OAuthService} from 'src/Oauth/oauth.service';
import {ProviderService} from 'src/providers/provider.service';

@Injectable()
export class TwitchActionsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly oauthService: OAuthService,
        private readonly providerService: ProviderService,
    ) {}

    async buildNewBestStreamObservable(req: any, body: any): Promise<Observable<any> | undefined> {
        await this.oauthService.refreshUserAccessToken(req.user.ID, 'twitch');
        let userProvider = await this.providerService.getUserProviders({where: {userID: req.user.ID, Name: 'twitch'}});
        let accessToken = userProvider[0].accessToken;
        const observable = new Observable((observer) => {
            let bestStreamer = 0;
            this.httpService
                .get(`https://api.twitch.tv/helix/streams?first=1`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Client-ID': process.env.TWITCH_CLIENT_ID,
                    },
                })
                .subscribe((response) => {
                    bestStreamer = response.data.data[0].user_id;
                });
            setInterval(async () => {
                console.log('Fetching Twitch streams');
                await this.oauthService.refreshUserAccessToken(req.user.ID, 'twitch');
                userProvider = await this.providerService.getUserProviders({where: {userID: req.user.ID, Name: 'twitch'}});
                accessToken = userProvider[0].accessToken;
                this.httpService
                    .get(`https://api.twitch.tv/helix/streams?first=1`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Client-ID': process.env.TWITCH_CLIENT_ID,
                        },
                    })
                    .subscribe((response) => {
                        if ((response.data.data[0]?.user_id ?? bestStreamer) != bestStreamer) {
                            bestStreamer = response.data.data[0].user_id;
                            observer.next(response.data);
                        }
                    });
            }, 10000);
        });
        return observable;
    }

    async buildNewHypeTrainObservable(req: any, body: any): Promise<Observable<any> | undefined> {
        if (!body.twitchUsername) return undefined;
        await this.oauthService.refreshUserAccessToken(req.user.ID, 'twitch');
        let userProvider = await this.providerService.getUserProviders({where: {userID: req.user.ID, Name: 'twitch'}});
        let accessToken = userProvider[0].accessToken;
        const res = await this.httpService
            .get(`https://api.twitch.tv/helix/users?login=${body.twitchUsername}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                },
            })
            .toPromise();
        const userID = res.data.data[0].id;
        const observable = new Observable((observer) => {
            let latestHypeTrain = 0;
            this.httpService
                .get(`https://api.twitch.tv/helix/hypetrain/events?broadcaster_id=${userID}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Client-ID': process.env.TWITCH_CLIENT_ID,
                    },
                })
                .subscribe((response) => {
                    latestHypeTrain = response.data.data[0]?.id ?? 0;
                });
            setInterval(async () => {
                console.log('Fetching Twitch hype trains');
                await this.oauthService.refreshUserAccessToken(req.user.ID, 'twitch');
                userProvider = await this.providerService.getUserProviders({where: {userID: req.user.ID, Name: 'twitch'}});
                accessToken = userProvider[0].accessToken;
                this.httpService
                    .get(`https://api.twitch.tv/helix/hypetrain/events?broadcaster_id=${userID}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Client-ID': process.env.TWITCH_CLIENT_ID,
                        },
                    })
                    .subscribe((response) => {
                        if ((response.data.data[0]?.id ?? latestHypeTrain) != latestHypeTrain) {
                            latestHypeTrain = response.data.data[0].id;
                            observer.next(response.data);
                        }
                    });
            }, 30000);
        });
        return observable;
    }

    async buildNewStreamerIsLiveObservable(req: any, body: any): Promise<Observable<any> | undefined> {
        if (!body.twitchUsername) return undefined;
        await this.oauthService.refreshUserAccessToken(req.user.ID, 'twitch');
        let userProvider = await this.providerService.getUserProviders({where: {userID: req.user.ID, Name: 'twitch'}});
        let accessToken = userProvider[0].accessToken;
        const observable = new Observable((observer) => {
            let isLive = false;
            this.httpService
                .get(`https://api.twitch.tv/helix/streams?user_login=${body.twitchUsername}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Client-ID': process.env.TWITCH_CLIENT_ID,
                    },
                })
                .subscribe((response) => {
                    isLive = response.data.data.length > 0;
                });
            setInterval(async () => {
                console.log('Fetching Twitch streams');
                await this.oauthService.refreshUserAccessToken(req.user.ID, 'twitch');
                userProvider = await this.providerService.getUserProviders({where: {userID: req.user.ID, Name: 'twitch'}});
                accessToken = userProvider[0].accessToken;
                this.httpService
                    .get(`https://api.twitch.tv/helix/streams?user_login=${body.twitchUsername}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Client-ID': process.env.TWITCH_CLIENT_ID,
                        },
                    })
                    .subscribe((response) => {
                        if (response.data.data.length > 0 != isLive) {
                            isLive = response.data.data.length > 0;
                            observer.next(response.data);
                        }
                    });
            }, 10000);
        });
        return observable;
    }
}
