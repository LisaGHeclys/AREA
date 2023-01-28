import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class TwitterActionsService {
    constructor(private readonly httpService: HttpService) {}

    async buildNewTweetObservable(body: any): Promise<Observable<any> | undefined> {
        if (!body?.twitterAccount) return undefined;
        const observable = new Observable((observer) => {
            let latestTweet = 0;
            setInterval(() => {
                console.log('Fetching tweets');
                this.httpService
                    .get(
                        `https://api.twitter.com/2/tweets/search/recent?query=from%3A${body.twitterAccount}&start_time=${new Date(
                            Date.now() - 30000,
                        ).toISOString()}&max_results=10`,
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                            },
                        },
                    )
                    .subscribe((response) => {
                        if (response.data.meta.result_count > 0 && response.data.data[0].id > latestTweet) {
                            observer.next(response.data);
                            latestTweet = response.data.data[0].id;
                        }
                    });
            }, 20000);
        });
        return observable;
    }

    async buildNewFollowerObservable(body: any): Promise<Observable<any> | undefined> {
        if (!body?.twitterId) {
            return undefined;
        }
        let followingCount = -1;
        await this.httpService
            .get(`https://api.twitter.com/2/users/${body.twitterId}?user.fields=public_metrics`, {
                headers: {
                    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                },
            })
            .subscribe((response) => {
                followingCount = response.data?.data?.public_metrics?.followers_count ?? 0;
            });
        const observable = new Observable((observer) => {
            setInterval(() => {
                console.log('fetching followers: old = ' + followingCount);
                this.httpService
                    .get(`https://api.twitter.com/2/users/${body.twitterId}?user.fields=public_metrics`, {
                        headers: {
                            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                        },
                    })
                    .subscribe((response) => {
                        if ((response.data.data.public_metrics?.followers_count ?? followingCount) > followingCount) {
                            observer.next(response.data);
                        }
                        followingCount = response.data?.data?.public_metrics?.followers_count;
                    });
            }, 20000);
        });
        return observable;
    }
}
