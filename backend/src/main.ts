import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ field không có trong DTO
      forbidNonWhitelisted: true, // Trả lỗi nếu client gửi field lạ
      transform: true, // Tự động cast kiểu (string → number, v.v.)
      transformOptions: {
        enableImplicitConversion: true, // Chỉ transform khi có decorator @Type() hoặc @Transform() trong DTO
      },
    }),
  );
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: (origin, callback) => {
      const raw = configService.get<string>('CORS_ORIGIN');
      const allowed = raw ? raw.split(',') : [];

      if (!origin || allowed.includes(origin as string)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
