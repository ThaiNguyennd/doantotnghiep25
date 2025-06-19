/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // cần để xài useStaticAssets

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 👉 Cho phép FE truy cập ảnh trong thư mục /uploads
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });

  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.enableCors({
    origin: '*',
  });

  app.use(cookieParser());

  const PORT = configService.get<string>('PORT');
  await app.listen(PORT ?? 3000);
}
bootstrap();
