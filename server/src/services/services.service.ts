import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {Service, Prisma, User} from '@prisma/client';
import {ProviderService} from 'src/providers/provider.service';
import {AreaStatusType} from 'src/types/status';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService, private providerService: ProviderService) {}

    async findMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ServiceWhereUniqueInput;
        where?: Prisma.ServiceWhereInput;
        orderBy?: Prisma.ServiceOrderByWithRelationInput;
    }): Promise<Service[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.service.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createService(data: Prisma.ServiceCreateInput): Promise<Service> {
        return this.prisma.service.create({
            data,
        });
    }

    async updateService(params: {where: Prisma.ServiceWhereUniqueInput; data: Prisma.ServiceUpdateInput}): Promise<Service> {
        const {where, data} = params;
        return this.prisma.service.update({
            data,
            where,
        });
    }

    async deleteService(where: Prisma.ServiceWhereUniqueInput): Promise<Service> {
        return this.prisma.service.delete({
            where,
        });
    }

    async subscribe(serviceId: number, req: any): Promise<AreaStatusType> {
        const user = await this.prisma.user.findUnique({
            where: {ID: req.user.ID},
        });
        if (user.services.includes(serviceId.toString())) {
            return;
        } else {
            if (serviceId === 2 || serviceId === 3) {
                const providers = await this.prisma.provider.findMany({
                    where: {
                        userID: req.user.ID,
                        Name: 'google',
                    },
                });
                if (providers.length === 0) {
                    return {
                        error: true,
                        message: 'You need to add a provider before subscribing to this service',
                        status: 400,
                        errorCode: 'NO_GOOGLE_PROVIDER',
                    };
                }
            }

            if (serviceId === 5) {
                const providers = await this.prisma.provider.findMany({
                    where: {
                        userID: req.user.ID,
                        Name: 'twitch',
                    },
                });
                if (providers.length === 0) {
                    return {
                        error: true,
                        message: 'You need to add a provider before subscribing to this service',
                        status: 400,
                        errorCode: 'NO_TWITCH_PROVIDER',
                    };
                }
            }

            if (serviceId >= 10 || serviceId < 0) {
                return {
                    error: true,
                    message: 'Invalid service ID',
                    status: 400,
                    errorCode: 'INVALID_SERVICE_ID',
                };
            }

            await this.prisma.user.update({
                where: {ID: req.user.ID},
                data: {
                    services: user.services + serviceId.toString(),
                },
            });
            return {
                error: false,
                status: 200,
                message: 'Successfully subscribed to service',
            };
        }
    }

    async unsubscribe(serviceId: number, req: any): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {ID: req.user.ID},
        });
        if (!user.services.includes(serviceId.toString())) {
            return;
        } else {
            return this.prisma.user.update({
                where: {ID: req.user.ID},
                data: {
                    services: user.services.split(serviceId.toString()[0]).join(''),
                },
            });
        }
    }

    async verifySubscription(serviceId: number, req: any): Promise<boolean> {
        console.log(req.user);
        const user = await this.prisma.user.findUnique({
            where: {ID: req.user.ID},
        });
        return user.services.includes(serviceId.toString());
    }
}
