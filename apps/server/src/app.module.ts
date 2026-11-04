import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { StatsController } from './stats/stats.controller';
import { StatsModule } from './stats/stats.module';
import { JwtConfigModule } from './config/jwt-config.module';
import { GroupModule } from './group/group.module';
import { CompetitionModule } from './competition/competition.module';

@Module({
  imports: [
    AuthModule,
    StatsModule,
    GroupModule,       // Модуль групп и членства (архитектурный задел)
    CompetitionModule, // Модуль соревнований и регистрации участников
    JwtConfigModule,   // JWT конфигурация (глобальный модуль)
  ],
  controllers: [AuthController, StatsController],
})
export class AppModule {}