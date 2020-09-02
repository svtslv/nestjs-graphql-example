import * as path from 'path';
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const env = process.env.NODE_ENV || 'development';
  const envPath = path.join(process.cwd(), `.${env}.env`);
  dotenv.config({ path: envPath });

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(+process.env.PORT || 3020, process.env.HOST || '127.0.0.1');
}

bootstrap().then(() => {
  Logger.log(`Started server on http://${process.env.HOST}:${process.env.PORT}`, 'Main');
});
