import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const formattedError = errors.map(error => {
        var obj = {};
        obj[error.property] = Object.values(error.constraints).length > 0 ? Object.values(error.constraints)[0] : ""
        return obj;
      })
      throw new BadRequestException(formattedError)
    },
  }));
  await app.listen(3000);
}
bootstrap();
