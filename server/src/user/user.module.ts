import {Module} from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';
import {userController} from './user.controller';
import {UserService} from './user.service';

@Module({
    imports: [],
    controllers: [userController],
    providers: [UserService, PrismaService],
    exports: [UserService],
})
export class UserModule {}
