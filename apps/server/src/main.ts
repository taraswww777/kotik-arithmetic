import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import { AppModule } from './app.module';
import { DatabaseModule } from './database/database.module';

async function bootstrap() {
  const app = NestFactory.create(AppModule, {
    rawBody: true,
    logger: ['error', 'warn'],
  });

  await app.listen(3000);
  console.log(`🐱 Kotik Arithmetic API is running on port 3000`);
}

bootstrap();