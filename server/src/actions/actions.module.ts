import {HttpModule} from '@nestjs/axios';
import {Module} from '@nestjs/common';
import {OauthModule} from 'src/Oauth/oauth.module';
import {OAuthService} from 'src/Oauth/oauth.service';
import {ProviderModule} from 'src/providers/provider.module';
import {ServiceModule} from 'src/services/services.module';
import {ActionsService} from './actions.service';
import {FlightService} from './flight/flight.service';
import {GoogleActionsService} from './google/google.actions.service';
import {TwitchActionsService} from './twitch/twitch.actions.service';
import {TwitterActionsService} from './twitter/twitter.actions.service';

@Module({
    imports: [HttpModule, ServiceModule, OauthModule, ProviderModule],
    controllers: [],
    providers: [ActionsService, GoogleActionsService, TwitterActionsService, FlightService, TwitchActionsService],
    exports: [ActionsService, GoogleActionsService, TwitterActionsService, FlightService, TwitchActionsService],
})
export class ActionModule {}
