import { Controller, Post, Body, Header, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    await this.authService.register(email, password);
    
    return { 
      message: 'Регистрация успешна',
      userId: `mock_${email.split('@')[0]}`, // Для mock-режима
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    try {
      const token = await this.authService.login(email, password);
      
      return { 
        token,
        message: 'Вход успешен',
      };
    } catch (error) {
      throw error; // Передаём ошибку (неверный пароль и т.д.)
    }
  }

  @Post('refresh')
  async refresh(@Body() body: { userId: string }) {
    const { userId } = body;
    
    return { 
      message: 'Токен обновлён',
      userId,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me() {
    // В production будет авторизация через Passport/JWT
    return {
      message: 'Данные текущего пользователя',
    };
  }

  /**
   * Проверка роли пользователя (для UI)
   */
  @Get('role')
  async getRole(@Body() body: { email: string }) {
    const { email } = body;
    const role = await this.authService.getUserRole(email);
    
    return {
      email,
      role,
      isChild: role === 'USER_ROLE_CHILD',
      isParent: role === 'USER_ROLE_PARENT',
    };
  }

  /**
   * Валидация токена (для CORS preflight и т.д.)
   */
  @Post('validate')
  async validate(@Body() body: { token: string }) {
    try {
      const result = await this.authService.verifyUser(body.token);
      return { valid: true, user: result };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

export class JwtAuthGuard implements any {
  constructor(private readonly authService: AuthService) {}
  
  // Для NestJS нужно создать Guard по отдельности
}