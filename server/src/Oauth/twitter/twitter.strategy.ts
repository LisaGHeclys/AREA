import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, verifyCallback} from 'passport-twitter';

import {env} from 'process';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
    constructor() {
        super({
            consumerKey: env.TWITTER_CONSUMER_KEY,
            consumerSecret: env.TWITTER_CONSUMER_SECRET,
            callbackURL: env.BASE_URL + '/auth/twitter/redirect',
            scope: ['follows.read', 'tweet.read', 'users.read', 'offline.access'],
        });
    }
    async validate(accessToken, refreshToken, profile, done): Promise<any> {
        return done(null, profile, accessToken, refreshToken);
    }
}
