import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {ServicesService} from 'src/services/services.service';
import {FlightService} from './flight/flight.service';
import {GoogleActionsService} from './google/google.actions.service';
import {TwitchActionsService} from './twitch/twitch.actions.service';
import {TwitterActionsService} from './twitter/twitter.actions.service';

@Injectable()
export class ActionsService {
    constructor(
        private readonly twitterService: TwitterActionsService,
        private readonly flightService: FlightService,
        private readonly googleService: GoogleActionsService,
        private readonly services: ServicesService,
        private readonly twitchService: TwitchActionsService,
    ) {}

    async factory(id: number, body: any, req: any): Promise<Observable<any>> {
        let observable: Observable<any> | undefined = undefined;
        observable = await this.factoryHelper(id, body, req);
        return observable;
    }

    async factoryHelper(id: number, body: any, req: any): Promise<Observable<any>> {
        console.log('entering');
        if (id == 1 && (await this.services.verifySubscription(1, req))) {
            return await this.twitterService.buildNewTweetObservable(body);
        }
        if (id == 2 && (await this.services.verifySubscription(1, req))) {
            return await this.twitterService.buildNewFollowerObservable(body);
        }
        if (id == 3 && (await this.services.verifySubscription(4, req))) {
            return await this.flightService.buildNearbyFlightObservable(body);
        }
        if (id == 4 && (await this.services.verifySubscription(3, req))) {
            return await this.googleService.buildNewEventObservable(body, req.user.ID);
        }
        if (id == 5 && (await this.services.verifySubscription(2, req))) {
            return await this.googleService.buildNewMailObservable(body, req.user.ID);
        }
        if (id == 6 && (await this.services.verifySubscription(5, req))) {
            return await this.twitchService.buildNewBestStreamObservable(req, body);
        }
        if (id == 7 && (await this.services.verifySubscription(5, req))) {
            return await this.twitchService.buildNewHypeTrainObservable(req, body);
        }
        if (id == 8 && (await this.services.verifySubscription(5, req))) {
            return await this.twitchService.buildNewStreamerIsLiveObservable(req, body);
        }
        if (id == 9 && (await this.services.verifySubscription(2, req))) {
            return await this.googleService.buildNewMailObservable(body, req.user.ID, true);
        }
        console.log('No action found');
        throw new Error('Unknown Action ID or Service not subscribed');
    }
}
