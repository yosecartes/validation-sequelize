import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import {
  HttpExceptionFilter,
  SequelizeExceptionFilter,
  TypeExceptionFilter,
} from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  // Error filters
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new SequelizeExceptionFilter());
  app.useGlobalFilters(new TypeExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const constraints = errors
          .map((err) => Object.values(err.constraints))
          .reduce((accumulator, next) => {
            return [...accumulator, ...next];
          }, []);

        throw new BadRequestException(`Some data isn't valid: ${constraints}`, {
          cause: errors,
        });
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
