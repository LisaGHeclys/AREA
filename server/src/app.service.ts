import {Injectable} from '@nestjs/common';
import {AboutType} from './types/about';
import {AreaStatusType} from './types/status';
import {ActionsService} from './actions/actions.service';
import {ReactionService} from './reactions/reaction.strategy';
import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import {AreaService} from './area/area.service';
import {Area} from '@prisma/client';
import {ServicesService} from './services/services.service';
import {PrismaService} from './prisma.service';
import {randomUUID} from 'crypto';

@Injectable()
export class AppService {
    constructor(
        private readonly actionsService: ActionsService,
        private readonly reactionsService: ReactionService,
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly areaService: AreaService,
        private readonly servicesService: ServicesService,
        private readonly prismaService: PrismaService,
    ) {}

    getHello(): string {
        return 'Hello World!';
    }

    async getAboutJson(ip: any): Promise<AboutType> {
        return {
            client: {
                host: ip,
            },
            server: {
                current_time: Date.now(),
                services: [
                    {
                        name: 'Discord',
                        actions: [],
                        reactions: [
                            {
                                name: 'send New message',
                                description: 'A new message in a discord channel',
                            },
                        ],
                    },
                    {
                        name: 'Twitter',
                        actions: [
                            {
                                name: 'New tweet from user',
                                description: 'The user X posted a new tweet',
                            },
                            {
                                name: 'User got a new follower',
                                description: 'The user X got a new follower on Twitter',
                            },
                        ],
                        reactions: [],
                    },
                    {
                        name: 'Gmail',
                        actions: [
                            {
                                name: 'User received a mail',
                                description: 'You received an email on gmail',
                            },
                            {
                                name: 'User got a new follower',
                                description: 'The user X got a new follower on Twitter',
                            },
                        ],
                        reactions: [
                            {
                                name: 'send New mail',
                                description: 'Sends a mail',
                            },
                            {
                                name: 'New document',
                                description: 'Creates a document in google documents',
                            },
                        ],
                    },
                    {
                        name: 'Google Calendar',
                        actions: [
                            {
                                name: 'Received Mail',
                                description: 'The user received a new mail',
                            },
                            {
                                name: 'Even incoming',
                                description: 'The user have an event in 1 hour or less',
                            },
                        ],
                        reactions: [
                            {
                                name: 'New event',
                                description: 'Create a new event in calendar',
                            },
                        ],
                    },
                    {
                        name: 'Flight Tracker',
                        actions: [
                            {
                                name: 'Plane Nearby',
                                description: 'A plane is 50 or less km away from coordinates',
                            },
                        ],
                        reactions: [],
                    },
                    {
                        name: 'Twitch',
                        actions: [
                            {
                                name: 'Streamer goes live',
                                description: 'The streamer X has gone live',
                            },
                            {
                                name: 'Best Stream',
                                description: 'The stream with the most viewers change',
                            },
                            {
                                name: 'Hype train',
                                description: 'The stream X has a new hype train',
                            },
                        ],
                        reactions: [
                            {
                                name: 'Send Whisper',
                                description: 'Send a message to an other user',
                            },
                        ],
                    },
                ],
            },
        };
    }

    userLogin(user): any {
        return this.authService.loginUser(user);
    }

    async userRegister(req): Promise<any> {
        if (!req.body?.email || !req.body?.password) {
            return 'Missing email or password';
        }
        const userSearch = await this.userService.users({where: {email: req.body.email}});
        if (userSearch.length > 0) {
            return 'User already exists';
        }
        try {
            const user = await this.authService.registerUser(req.body.email, req.body.password);
            return this.authService.loginUser(user);
        } catch (e) {
            return 'Error while creating user';
        }
    }

    async createArea(req, actionId: string, reactionId: string): Promise<AreaStatusType> {
        try {
            const observable = await this.actionsService.factory(parseInt(actionId), req.body, req);
            console.log('observable created');
            observable.subscribe((data: any) => {
                this.reactionsService.factory(req, parseInt(reactionId), req.body);
            });
        } catch (e) {
            console.log(e);
            return {
                error: true,
                status: 400,
                message: 'Error while creating area',
            };
        }

        await this.areaService.createArea({
            actionID: parseInt(actionId),
            reactionID: parseInt(reactionId),
            name: req.body.name === undefined || req.body.name === '' ? randomUUID() : req.body.name,
            user: {connect: {ID: req.user.ID}},
            parameters: JSON.stringify(req.body),
        });

        return {
            error: false,
            status: 200,
            message: 'Observable created',
        };
    }

    async getAreas(req): Promise<Area[]> {
        console.log(req.user.ID);
        return this.areaService.findMany({where: {user: {ID: req.user.ID}}});
    }
}
