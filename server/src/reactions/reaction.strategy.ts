import {Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {ServicesService} from 'src/services/services.service';
import {DiscordReactionsService} from './discord/discord.reactions.service';
import {GoogleReactionsService} from './google/google.reactions.service';
import {TwitchReactionsService} from './twitch/twitch.reactions.service';

@Injectable()
export class ReactionService {
    constructor(
        private readonly googleService: GoogleReactionsService,
        private readonly discordService: DiscordReactionsService,
        private readonly services: ServicesService,
        private readonly twitchService: TwitchReactionsService,
    ) {}

    async factory(req: any, id: number, body: any): Promise<Observable<any>> {
        let observable: Observable<any> | undefined = undefined;
        observable = await this.factoryHelper(req, id, body);
        if (observable === undefined) throw new Error('Unknown action');
        return observable;
    }

    async factoryHelper(req: any, id: number, body: any): Promise<Observable<any> | undefined> {
        if (id == 1 && (await this.services.verifySubscription(2, req))) {
            body.apiKey = process.env.GOOGLE_CLIENT_ID;
            return await this.googleService.buildSendMailObservable(req, body);
        }
        if (id == 2 && (await this.services.verifySubscription(0, req))) {
            return await this.discordService.buildSendMessageObservable(body);
        }
        if (id == 3 && (await this.services.verifySubscription(3, req))) {
            return await this.googleService.buildNewEventObservable(req, body);
        }
        if (id == 4 && (await this.services.verifySubscription(2, req))) {
            return await this.googleService.buildNewDocumentObservable(req, body);
        }
        if (id == 5 && (await this.services.verifySubscription(2, req))) {
            return await this.googleService.buildNewDraftObservable(req, body);
        }
        if (id == 6 && (await this.services.verifySubscription(5, req))) {
            return await this.twitchService.buildSendWhisperMessage(req, body);
        }
        throw new Error('Unknown Reaction ID or Service not subscribed');
    }
}
