import {Body, Controller, Get, Ip, Param, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Area} from '@prisma/client';
import {AppService} from './app.service';
import {JwtAuthGuard} from './auth/jwt-auth.guard';
import {LocalAuthGuard} from './auth/local-auth.guard';
import {AboutType} from './types/about';
import {AreaStatusType} from './types/status';
import {RealIP} from 'nestjs-real-ip';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('about.json')
    getAboutJson(@RealIP() ip: string): Promise<AboutType> {
        return this.appService.getAboutJson(ip);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiTags('Auth')
    @ApiOperation({description: 'This route is login locally', summary: 'login'})
    userLogin(@Request() req): Promise<any> {
        return this.appService.userLogin(req.user);
    }

    @Post('register')
    @ApiTags('Auth')
    @ApiOperation({description: 'This route is used to register locally', summary: 'register'})
    userRegister(@Request() req): Promise<any> {
        return this.appService.userRegister(req);
    }

    @UseGuards(JwtAuthGuard)
    @Post('createArea/:actionId/:reactionId')
    @ApiTags('Area')
    @ApiOperation({description: 'This route is used to create an Area', summary: 'Create Area'})
    async poc(@Request() req, @Param('actionId') actionId: string, @Param('reactionId') reactionID: string): Promise<AreaStatusType> {
        return this.appService.createArea(req, actionId, reactionID);
    }

    @UseGuards(JwtAuthGuard)
    @Get('areas')
    @ApiOperation({description: 'This route is used to get all the areas', summary: 'get areas'})
    async getAreas(@Request() req): Promise<Area[]> {
        return this.appService.getAreas(req);
    }
}
