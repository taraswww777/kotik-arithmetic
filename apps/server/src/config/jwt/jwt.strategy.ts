import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';

export class JwtPayload {
  userId: string; // Внутренний ID пользователя
  externalId?: string; // Внешний ID для идентификации
  email: string;
  role: string; // enum: USER_ROLE_CHILD, USER_ROLE_PARENT
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.userId) {
      throw new UnauthorizedException('Invalid payload');
    }

    // Возвращаем пользователя с его данными
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      externalId: payload.externalId,
    };
  }
}