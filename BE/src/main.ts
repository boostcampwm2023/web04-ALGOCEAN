import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
