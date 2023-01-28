import {HttpModule} from '@nestjs/axios';
import {Module} from '@nestjs/common';
import {OauthModule} from 'src/Oauth/oauth.module';
import {ProviderModule} from 'src/providers/provider.module';
import {ServiceModule} from 'src/services/services.module';
import {DiscordReactionsService} from './discord/discord.reactions.service';
import {GoogleReactionsService} from './google/google.reactions.service';
import {ReactionService} from './reaction.strategy';
import {TwitchReactionsService} from './twitch/twitch.reactions.service';

@Module({
    imports: [HttpModule, ServiceModule, ProviderModule, OauthModule],
    controllers: [],
    providers: [ReactionService, GoogleReactionsService, DiscordReactionsService, TwitchReactionsService],
    exports: [ReactionService, GoogleReactionsService, DiscordReactionsService, TwitchReactionsService],
})
export class ReactionModule {}
