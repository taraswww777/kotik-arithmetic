import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import { AppModule } from './app.module';
import { DatabaseModule } from './database/database.module';
import { JwtConfigModule } from './config/jwt-config.module';

async function bootstrap() {
  // Создаём Express приложение
  const app = NestFactory.create(AppModule, {
    rawBody: true,
    logger: ['error', 'warn'],
  });

  // Подключаем модуль JWT конфигурации
  app.useGlobalGuards();
  
  // Настройка CORS (будущее)
  // await app.enableCors({
  //   origin: process.env.CLIENT_URL,
  //   credentials: true,
  // });

  await app.listen(3000);
  console.log(`🐱 Kotik Arithmetic API is running on port 3000`);
}

bootstrap();