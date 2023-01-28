import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {OAuthService} from 'src/Oauth/oauth.service';
import {ProviderService} from 'src/providers/provider.service';

@Injectable()
export class GoogleActionsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly oauthService: OAuthService,
        private readonly providerService: ProviderService,
    ) {}

    async buildNewEventObservable(body: any, userId: number): Promise<Observable<any> | undefined> {
        if (!body?.calendarId) return undefined;
        await this.oauthService.refreshGoogleToken(userId);
        const user = await this.providerService.getUserProviders({where: {userID: userId, Name: 'google'}});
        console.log(user);
        const observable = new Observable((observer) => {
            let newestEvent = 0;
            this.httpService
                .get(
                    `https://www.googleapis.com/calendar/v3/calendars/${
                        body.calendarId
                    }/events?timeMin=${new Date().toISOString()}&timeMax=${new Date(Date.now() + 60000 * 60).toISOString()}&key=${
                        process.env.GOOGLE_API_KEY
                    }`,
                    {
                        headers: {
                            Authorization: `Bearer ${user[0].accessToken}`,
                        },
                    },
                )
                .subscribe((response) => {
                    if (response.data.items.length > 0) {
                        newestEvent = response.data.items[0].id;
                    }
                });
            setInterval(async () => {
                console.log('Fetching GCalendar events');
                await this.oauthService.refreshGoogleToken(userId);
                const user = await this.providerService.getUserProviders({where: {userID: userId, Name: 'google'}});
                this.httpService
                    .get(
                        `https://www.googleapis.com/calendar/v3/calendars/${
                            body.calendarId
                        }/events?timeMin=${new Date().toISOString()}&timeMax=${new Date(Date.now() + 60000 * 60).toISOString()}&key=${
                            process.env.GOOGLE_API_KEY
                        }`,
                        {
                            headers: {
                                Authorization: `Bearer ${user[0].accessToken}`,
                            },
                        },
                    )
                    .subscribe((response) => {
                        console.log(response.data);
                        if (response.data.items.length > 0 && response.data.items[0].id != newestEvent) {
                            observer.next(response.data);
                            newestEvent = response.data.items[0].id;
                        }
                    });
            }, 60000);
        });
        return observable;
    }

    async buildNewMailObservable(body: any, userId: number, mailSent: boolean = false): Promise<Observable<any> | undefined> {
        console.log(body);
        if (!body.actionUserId) return undefined;
        await this.oauthService.refreshGoogleToken(userId);
        const user = await this.providerService.getUserProviders({where: {userID: userId, Name: 'google'}});
        if (user[0].accessToken == null) {
            console.log('bug');
            return undefined;
        }
        const observable = new Observable((observer) => {
            let biggestEmailId = 0;
            this.httpService
                .get(
                    `https://gmail.googleapis.com/gmail/v1/users/${body.actionUserId}/messages?key=${process.env.GOOGLE_CLIENT_ID}&q=${
                        mailSent ? 'from' : 'to'
                    }%3A${body.actionUserId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user[0].accessToken}`,
                        },
                    },
                )
                .subscribe((response) => {
                    if ((response.data?.messages.length ?? -1) > 0) {
                        biggestEmailId = response.data.messages[0].id;
                    }
                });
            setInterval(async () => {
                await this.oauthService.refreshGoogleToken(userId);
                const user = await this.providerService.getUserProviders({where: {userID: userId, Name: 'google'}});
                this.httpService
                    .get(
                        `https://gmail.googleapis.com/gmail/v1/users/${body.actionUserId}/messages?key=${process.env.GOOGLE_CLIENT_ID}&q=to%3A${body.actionUserId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${user[0].accessToken}`,
                            },
                        },
                    )
                    .subscribe((response) => {
                        console.log(response.data);
                        if ((response.data?.messages.length ?? -1) > 0 && (response.data?.messages[0].id ?? -1) > biggestEmailId) {
                            observer.next(response.data);
                            biggestEmailId = response.data.messages[0].id;
                        }
                    });
            }, 10000);
        });
        return observable;
    }
}
