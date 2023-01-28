import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class FlightService {
    constructor(private readonly httpService: HttpService) {}

    async buildNearbyFlightObservable(body) {
        if (!body?.lon || !body?.lat) {
            return undefined;
        }
        const observable = new Observable((observer) => {
            setInterval(() => {
                console.log('fetching aircrafts nearby');
                this.httpService
                    .get(`https://adsbx-flight-sim-traffic.p.rapidapi.com/api/aircraft/json/lat/${body.lat}/lon/${body.lon}/dist/25/`, {
                        headers: {
                            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                            'X-RapidAPI-Host': 'adsbx-flight-sim-traffic.p.rapidapi.com',
                        },
                    })
                    .subscribe((response) => {
                        console.log(response.data);
                        if (response.data.total > 0) {
                            observer.next(response.data);
                        }
                    });
            }, 100000);
        });
        return observable;
    }
}
