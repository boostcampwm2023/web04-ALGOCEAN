import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ALGOCEAN API')
    .setDescription('API Documentation')
    .setVersion('0.4.1')
    .addTag('ALGOCEAN')
    .addServer('https://algocean.site/api')
    .addServer('https://algocean.site')
    .addServer('http://algocean.site/api')
    .addServer('http://algocean.site')
    .addServer('api')
    .addServer('/')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'Authorization',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    origin: [
      'https://www.algocean.site',
      'https://algocean.site',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173',
    ],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  await app.listen(3000);
}
bootstrap();
