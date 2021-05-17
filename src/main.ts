import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const formattedError = errors.map(error => {
        var obj = {};
        obj[error.property] = Object.values(error.constraints).length > 0 ? Object.values(error.constraints)[0] : ""
        return obj;
      })
      console.log(formattedError)
      console.log(Object.assign.apply(Object, formattedError))
      throw new BadRequestException(Object.assign.apply(Object, formattedError))
    },
  }));

  const firebaseConfig = {
    "project_id" : process.env.firebaseProjectId,
    "private_key" : process.env.firebasePrivateKey.replace(/\\n/g, '\n'),
    "clientEmail" : process.env.firebaseClientEmail
  }

  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    storageBucket: process.env.firebaseStorageKey
  });

  await app.listen(3000);
}
bootstrap();
