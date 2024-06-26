/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { TypeOrmFilter } from './app/shared/exceptions/typeorm.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new TypeOrmFilter());
  const frontend = process.env.FRONTEND_URL || '';
  app.enableCors({
    origin: [frontend],
    credentials: true,
  });
  console.log(process.env.FRONTEND_URL);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  app.use(cookieParser.default());
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
