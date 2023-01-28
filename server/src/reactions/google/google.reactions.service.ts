import {HttpService} from '@nestjs/axios';
import {HttpException, HttpStatus, Injectable, Request} from '@nestjs/common';
import {catchError, Observable} from 'rxjs';
import {OAuthService} from 'src/Oauth/oauth.service';
import {ProviderService} from 'src/providers/provider.service';

@Injectable()
export class GoogleReactionsService {
    constructor(
        private readonly http: HttpService,
        private readonly providerService: ProviderService,
        private readonly oauthService: OAuthService,
    ) {}

    async buildSendMailObservable(@Request() req, body: {to: string; subject: string; message: string}) {
        await this.oauthService.refreshGoogleToken(req.user.ID);
        const userData = (await this.providerService.getUserProviders({where: {userID: req.user.ID, Name: 'google'}})).find(Boolean);
        const encoded64Message = Buffer.from(
            'From: <me>\nTo: <' + body.to + '>\nSubject: ' + body.subject + '\n\n' + body.message + '\n' + Date.now().toLocaleString(),
        ).toString('base64');
        const res = await this.http
            .post(
                'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
                {raw: encoded64Message, key: process.env.GOOGLE_CLIENT_ID},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + userData.accessToken,
                    },
                },
            )
            .pipe(
                catchError((error) => {
                    console.log(error);
                    return error;
                }),
            );
        res.subscribe(() => {});
        return res;
    }

    async buildNewEventObservable(
        @Request() req,
        body: {
            startTime: string;
            endTime: string;
            accessToken: string;
            reaCalendarId: string;
            summary: string;
            description: string;
            userID: number;
        },
    ) {
        await this.oauthService.refreshGoogleToken(req.user.ID);
        const userData = (await this.providerService.getUserProviders({where: {userID: body.userID, Name: 'google'}})).find(Boolean);
        const res = await this.http
            .post(
                `https://www.googleapis.com/calendar/v3/calendars/${body.reaCalendarId}/events`,
                {
                    key: process.env.GOOGLE_API_KEY,
                    start: {
                        dateTime: body.startTime,
                        timeZone: 'America/Los_Angeles',
                    },
                    end: {
                        dateTime: body.endTime,
                        timeZone: 'America/Los_Angeles',
                    },
                    summary: body.summary,
                    description: body.description,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + userData.accessToken,
                    },
                },
            )
            .pipe(
                catchError((err) => {
                    console.log(err);
                    return err;
                }),
            );
        res.subscribe((data) => {});
        return res;
    }

    async buildNewDocumentObservable(@Request() req, body: {title: string}) {
        await this.oauthService.refreshGoogleToken(req.user.ID);
        const userData = (await this.providerService.getUserProviders({where: {userID: req.user.ID, Name: 'google'}})).find(Boolean);
        const res = await this.http
            .post(
                `https://docs.googleapis.com/v1/documents`,
                {title: body.title},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + userData.accessToken,
                    },
                },
            )
            .pipe(
                catchError((err) => {
                    console.log(err);
                    return err;
                }),
            );
        res.subscribe(() => {});
        return res;
    }

    async buildNewDraftObservable(@Request() req, body: {to: string; subject: string; message: string}) {
        await this.oauthService.refreshGoogleToken(req.user.ID);
        const userData = (await this.providerService.getUserProviders({where: {userID: req.user.ID, Name: 'google'}})).find(Boolean);
        console.log(userData);
        const encoded64Message = Buffer.from(
            'From: <me>\nTo: \nSubject: ' + body.subject + '\n\n' + body.message + '\n' + Date.now().toLocaleString(),
        ).toString('base64');
        const res = await this.http
            .post(
                'https://gmail.googleapis.com/gmail/v1/users/me/drafts?key=' + process.env.GOOGLE_CLIENT_ID,
                {message: {raw: encoded64Message}},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + userData.accessToken,
                    },
                },
            )
            .pipe(
                catchError((error) => {
                    console.log(error);
                    return error;
                }),
            );
        res.subscribe(() => {});
        return res;
    }
}
