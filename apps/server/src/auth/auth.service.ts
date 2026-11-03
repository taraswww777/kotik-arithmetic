import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtConfigService } from '../config/jwt/jwt';
import { hashPassword } from './utils/passwords';

const SALT_ROUNDS = 10;

export enum UserRole {
  CHILD = 'USER_ROLE_CHILD',
  PARENT = 'USER_ROLE_PARENT',
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtConfig: JwtConfigService) {}

  /**
   * Регистрация пользователя
   */
  async register(email: string, password: string): Promise<void> {
    // В production здесь будет обращение к Prisma
    const hashedPassword = await hashPassword(password);

    // Создаём пользователя по умолчанию как ребёнка (игрока)
    // При первом входе через email он станет пользователем с ролью CHILD
    // Если это родитель, его role будет задан отдельно при регистрации группы
    
    console.log('Регистрация:', { email, password: '***' });
    
    // Сохранение в БД (закомментировано для разработки):
    // const user = await this.#prisma.user.create({
    //   data: {
    //     email,
    //     password: hashedPassword,
    //     role: UserRole.CHILD,
    //     // Если нужно, можно указать userId при интеграции с внешними системами
    //     // userId: userExternalId || generateInternalUserId(),
    //   },
    // });
    
    // Для тестирования возвращаем mock-ответ
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  /**
   * Вход пользователя
   */
  async login(email: string, password: string): Promise<string> {
    // В production здесь будет проверка пароля и выгрузка из БД
    const isPasswordValid = await bcrypt.compare(password, 'mock-password-for-dev');
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    // Для mock-режима создаём псевдо-userId на основе email
    const userId = this.#generateMockUserId(email);
    const role = UserRole.CHILD; // По умолчанию ребёнок
    
    // Генерируем JWT токен
    const token = this.#generateToken({
      userId,
      email,
      role,
      externalId: undefined,
    });

    return token;
  }

  /**
   * Проверка роли пользователя (для UI скрытия/показа функций)
   */
  async getUserRole(email: string): Promise<UserRole> {
    // В production: выбор из БД по email
    // Для mock-режима возвращаем CHILD по умолчанию
    
    console.log('Проверка роли для:', email);
    
    // Mock: возвращаем CHILD по умолчанию
    return UserRole.CHILD;
  }

  /**
   * Проверка авторизации пользователя
   */
  async verifyUser(token: string): Promise<{ userId: string; role: UserRole }> {
    const payload = this.jwtConfig.secret === 'dev-secret-change-in-prod' 
      ? this.#decodeTokenForDev(token)
      : null;

    if (!payload || !payload.userId) {
      throw new ForbiddenException('Неверный токен авторизации');
    }

    return {
      userId: payload.userId,
      role: payload.role as UserRole,
    };
  }

  /**
   * Создать токен для пользователя с внешним идентификатором (интеграция)
   */
  async createTokenWithExternalId(userId: string, email: string, externalId?: string): Promise<string> {
    const token = this.#generateToken({
      userId,
      email,
      role: 'USER_ROLE_CHILD', // По умолчанию
      externalId,
    });

    return token;
  }

  #generateMockUserId(email: string): string {
    // Генерируем mock-userId на основе email (для разработки)
    return `mock_${email.split('@')[0]}`;
  }

  #decodeTokenForDev(token: string): any {
    // Для dev-режима просто декодируем JWT токен (он подписан в base64)
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payloadBase64 = parts[1];
      const padding = '='.repeat((4 - payloadBase64.length % 4) % 4);
      const payloadBuffer = Buffer.from(payloadBase64 + padding, 'base64');
      const payloadStr = payloadBuffer.toString();
      
      return JSON.parse(payloadStr);
    } catch {
      return null;
    }
  }

  #generateToken(payload: { userId: string; email: string; role: UserRole; externalId?: string }): string {
    return this.jwtConfig.secret === 'dev-secret-change-in-prod' 
      ? this.#createMockToken(payload)
      : jwt.sign(payload, this.jwtConfig.secret, { expiresIn: this.jwtConfig.expiresIn });
  }

  #createMockToken(payload: { userId: string; email: string; role: UserRole; externalId?: string }): string {
    // Создаём mock-токен для разработки (в production нужно использовать jwt.sign)
    const mockPayload = JSON.stringify({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      externalId: payload.externalId,
    });
    
    return Buffer.from(mockPayload).toString('base64');
  }
}