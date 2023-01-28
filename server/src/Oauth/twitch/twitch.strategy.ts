import {ConsoleLogger, Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, verifyCallback} from 'passport-twitter';

import {env} from 'process';
import {ProviderService} from 'src/providers/provider.service';

@Injectable()
export class TwitchStrategy {
    constructor(private providerService: ProviderService) {}

    async getTwitchCodeUrl(ID: any) {
        let url = process.env.BASE_URL + '/auth/twitch/redirect';
        url = url.replace(':', '%3A');
        url = url.replace('/', '%2F');
        return `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${url}&response_type=code&scope=channel%3Aread%3Ahype_train+user%3Aread%3Afollows+user%3Amanage%3Awhispers&state=${ID}"`;
    }

    async getTwitchToken(code: string) {
        let url = process.env.BASE_URL + '/auth/twitch/redirect';
        url = url.replace(':', '%3A');
        url = url.replace('/', '%2F');
        const res = await fetch(
            `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${url}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            },
        );
        return res.json();
    }

    async updateUserToken(userId, access_token, refresh_token) {
        await this.providerService.updateUserToken(userId, 'twitch', access_token, refresh_token);
    }

    async refreshToken(userId: number) {
        const refresh_token = await this.providerService
            .getUserProviders({where: {userID: userId, Name: 'twitch'}})
            .then((res) => res[0].refreshToken);
        const res = await fetch(
            `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refresh_token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            },
        );
        const json = await res.json();
        if (json.error) return undefined;
        this.updateUserToken(userId, json.access_token, json.refresh_token);
        return json.access_token;
    }
}
