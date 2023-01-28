import {Injectable} from '@nestjs/common';
import {Provider, Prisma} from '@prisma/client';
import {PrismaService} from 'src/prisma.service';

@Injectable()
export class ProviderService {
    constructor(private prisma: PrismaService) {}

    async updateUserToken(userID: number, providerName: string, accessToken: string = 'null', refreshToken?: string) {
        const stringUserID: string = userID.toString();
        const userProviders = await this.getUserProviders({where: {userID: parseInt(stringUserID), Name: providerName}});
        const provider = userProviders[0];
        if (provider) {
            await this.prisma.user.update({
                where: {ID: parseInt(stringUserID)},
                data: {
                    Providers: {
                        update: {
                            where: {ID: provider.ID},
                            data: {Name: providerName, accessToken: accessToken, ...(refreshToken && {refreshToken})},
                        },
                    },
                },
            });
        } else {
            await this.prisma.user.update({
                where: {ID: userID},
                data: {
                    Providers: {
                        create: {Name: providerName, accessToken: accessToken, refreshToken: refreshToken},
                    },
                },
            });
        }
    }

    async getUserProviders(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProviderWhereUniqueInput;
        where?: Prisma.ProviderWhereInput;
        orderBy?: Prisma.ProviderOrderByWithRelationInput;
    }): Promise<Provider[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.provider.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
}
