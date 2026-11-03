import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>('JWT_SECRET') || 'dev-secret-change-in-prod';
  }

  get expiresIn(): number {
    return this.configService.get<number>('JWT_EXPIRES_IN') || 86400; // 24 часа по умолчанию
  }
}