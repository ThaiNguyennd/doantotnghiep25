/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const PORT = configService.get<string>('PORT');
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
  });

  // config cookie
  app.use(cookieParser());

  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  await app.listen(PORT ?? 3000);
}
bootstrap();
