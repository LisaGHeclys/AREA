import {Module} from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';
import {ProviderModule} from 'src/providers/provider.module';
import {servicesController} from './services.controller';
import {ServicesService} from './services.service';

@Module({
    imports: [ProviderModule],
    controllers: [servicesController],
    providers: [ServicesService, PrismaService],
    exports: [ServicesService],
})
export class ServiceModule {}
