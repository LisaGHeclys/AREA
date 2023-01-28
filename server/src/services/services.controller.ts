import {Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Request} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {Service as ServiceModel, User} from '@prisma/client';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {AreaStatusType} from 'src/types/status';
import {ServicesService} from './services.service';

@Controller('Services')
@ApiTags('Service')
export class servicesController {
    constructor(private servicesService: ServicesService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    @ApiOperation({description: 'This route is used to get all the services', summary: 'get all services'})
    async getServices(): Promise<ServiceModel[]> {
        return this.servicesService.findMany({});
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({description: 'This route is used to get the service with ID X', summary: 'get X service'})
    async getService(@Param('id') id: string): Promise<ServiceModel> {
        const test = await this.servicesService.findMany({where: {ID: parseInt(id)}});
        console.log(test);
        return test[0];
    }

    @UseGuards(JwtAuthGuard)
    @Post('subscribe/:id')
    @ApiOperation({description: 'This route is used to subscribe to a service', summary: 'subscribe to service'})
    async subscribeService(@Param('id') id: string, @Request() req: any): Promise<AreaStatusType> {
        return this.servicesService.subscribe(parseInt(id), req);
    }

    @UseGuards(JwtAuthGuard)
    @Post('unsubscribe/:id')
    @ApiOperation({description: 'This route is used to unsubscribe to a service', summary: 'unsubscribe to service'})
    async unsubscribeService(@Param('id') id: string, @Request() req: any): Promise<User> {
        return this.servicesService.unsubscribe(parseInt(id), req);
    }
}
