import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, verifyCallback} from 'passport-google-oauth20';
import {env} from 'process';

@Injectable()
export class ProviderStrategy extends PassportStrategy(Strategy, 'google-provider') {
    constructor() {
        super({
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: env.BASE_URL + '/auth/google/redirect',
            response_type: ['token'],
            passReqToCallback: true,
            scope: [
                'profile',
                'email',
                'https://mail.google.com/',
                'https://www.googleapis.com/auth/gmail.modify',
                'https://www.googleapis.com/auth/gmail.compose',
                'https://www.googleapis.com/auth/gmail.send',
                'https://www.googleapis.com/auth/calendar.readonly',
                'https://www.googleapis.com/auth/calendar.events',
                'https://www.googleapis.com/auth/calendar.events.readonly',
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/documents',
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
            ],
        });
    }
    authorizationParams(): {[key: string]: string} {
        return {
            access_type: 'offline',
            prompt: 'consent',
        };
    }

    authenticate(req, options) {
        options.state = '{"provider": "google"}';
        super.authenticate(req, options);
    }

    async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: verifyCallback): Promise<any> {
        const {name, emails, id, state} = profile;
        console.log(req, profile);
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            id,
            accessToken,
            refreshToken,
            state,
        };
        done(null, user);
    }
}
