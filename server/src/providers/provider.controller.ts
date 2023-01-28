import {Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Request} from '@nestjs/common';
import {ProviderService} from './provider.service';
import {Provider as ProviderModel} from '@prisma/client';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {AreaStatusType} from 'src/types/status';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@Controller('Provider')
@ApiTags('Providers')
export class ProviderController {
    constructor(private providerService: ProviderService) {}

    @Get()
    @ApiOperation({description: 'This route is used to get all the providers', summary: 'get providers'})
    async getProviders(@Request() req): Promise<ProviderModel[]> {
        return this.providerService.getUserProviders({where: {userID: parseInt(req.user.ID)}});
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    @ApiOperation({description: 'This route is update a provider', summary: 'update provider'})
    async updateProvider(@Request() req): Promise<AreaStatusType> {
        await this.providerService.updateUserToken(req.user.ID, req.body.providerName, req.body.accessToken, req.body.refreshToken);
        return {
            error: false,
            message: 'Provider updated',
            status: 200,
        };
    }
}
