import { Injectable } from '@nestjs/common';
import { registerSchema, loginSchema } from 'shared-validation';

@Injectable()
export class AuthService {
  async register(email: string, password: string): Promise<void> {
    // Регистрация пользователя
    const registrationData = registerSchema.safeParse({ email, password });
    if (!registrationData.success) {
      throw new Error('Некорректные данные регистрации');
    }
    
    // Здесь будет сохранение в БД через Prisma
    console.log('Регистрация:', email);
  }

  async login(email: string, password: string): Promise<string> {
    // Вход пользователя
    const loginData = loginSchema.safeParse({ email });
    if (!loginData.success) {
      throw new Error('Некорректные данные входа');
    }
    
    // Здесь будет генерация токена и проверка пароля
    console.log('Вход:', email);
    return 'mock-jwt-token';
  }
}