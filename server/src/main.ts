import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {env} from 'process';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    var session = require('express-session');
    const config = new DocumentBuilder()
        .setTitle('Area Server Documentation')
        .setDescription('The API routes descriptions')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);

    app.use(session({secret: env.SECRET}));
    app.enableCors();
    await app.listen(process.env.PORT || 8080);
}
bootstrap();
