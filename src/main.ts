import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { version } from '../package.json';
import { APP_PORT, CORS_WHITE_LIST } from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Boiterplate Api')
    .setDescription('Boiterplate Api')
    .setVersion(version)
    .addServer(`http://localhost:${APP_PORT}/`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  fs.writeFileSync('./swagger-docs.json', JSON.stringify(document));
  SwaggerModule.setup('/', app, document);

  app.enableCors({
    origin: function (origin, callback) {
      if (
        !origin ||
        CORS_WHITE_LIST.some((allowedDomain) => origin.includes(allowedDomain))
      ) {
        callback(null, true);
      } else {
        console.error(`Blocking request from ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
  });

  await app.listen(APP_PORT);
}
bootstrap();
