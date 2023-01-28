import {HttpModule} from '@nestjs/axios';
import {Module} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthService} from 'src/auth/auth.service';
import {PrismaService} from 'src/prisma.service';
import {ProviderModule} from 'src/providers/provider.module';
import {ServiceModule} from 'src/services/services.module';
import {UserModule} from 'src/user/user.module';
import {GoogleStrategy} from './google/google.strategy';
import {ProviderStrategy} from './google/provider.startegy';
import {OAuthController} from './oauth.controller';
import {OAuthService} from './oauth.service';
import {TwitchStrategy} from './twitch/twitch.strategy';
import {TwitterStrategy} from './twitter/twitter.strategy';

@Module({
    imports: [ProviderModule, UserModule, HttpModule, ServiceModule],
    controllers: [OAuthController],
    providers: [OAuthService, GoogleStrategy, ProviderStrategy, AuthService, JwtService, TwitterStrategy, TwitchStrategy],
    exports: [OAuthService],
})
export class OauthModule {}
