import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { StatsController } from './stats/stats.controller';
import { StatsModule } from './stats/stats.module';
import { JwtConfigModule } from './config/jwt-config.module';

@Module({
  imports: [
    AuthModule,
    StatsModule,
    JwtConfigModule, // JWT конфигурация (глобальный модуль)
  ],
  controllers: [AuthController, StatsController],
})
export class AppModule {}