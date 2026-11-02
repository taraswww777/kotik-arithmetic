import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { PrismaService } from '../database/database.module';

@Module({
  imports: [],
  providers: [StatsService, PrismaService],
  exports: [StatsService],
})
export class StatsModule {}