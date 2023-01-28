import {Module} from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';
import {ProviderController} from './provider.controller';
import {ProviderService} from './provider.service';

@Module({
    imports: [],
    controllers: [ProviderController],
    providers: [ProviderService, PrismaService],
    exports: [ProviderService],
})
export class ProviderModule {}
