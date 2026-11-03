import { Module } from '@nestjs/common';
import { JwtConfigService } from './jwt/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule.register({})], // Для стратегии достаточно базовой регистрации
  providers: [JwtStrategy, JwtConfigService],
  exports: [JwtStrategy, JwtConfigService],
})
export class JwtConfigModule {}