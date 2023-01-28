import {Module} from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';
import {AreaService} from './area.service';

@Module({
    controllers: [],
    providers: [AreaService, PrismaService],
    exports: [AreaService],
})
export class AreaModule {}
