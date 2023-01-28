import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {HttpModule} from '@nestjs/axios';
import {AuthService} from './auth/auth.service';
import {LocalStrategy} from './auth/local.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {JwtStrategy} from './auth/jwt.strategy';
import {AreaService} from './area/area.service';
import {ProviderModule} from './providers/provider.module';
import {UserModule} from './user/user.module';
import {OauthModule} from './Oauth/oauth.module';
import {ReactionModule} from './reactions/reaction.module';
import {ServiceModule} from './services/services.module';
import {PrismaService} from './prisma.service';
import {ActionModule} from './actions/actions.module';
import {AreaModule} from './area/area.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule,
        PassportModule,
        JwtModule.register({secret: process.env.SECRET}),
        ProviderModule,
        UserModule,
        OauthModule,
        ReactionModule,
        ActionModule,
        AreaModule,
        ServiceModule,
    ],
    controllers: [AppController],
    providers: [AppService, LocalStrategy, PrismaService, AuthService, JwtService, JwtStrategy, AreaService],
})
export class AppModule {}
