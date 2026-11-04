import { Module } from '@nestjs/common';
import { PrismaService } from '../database/database.module';
import { CompetitionsController } from './competitions.controller';
import { CompetitionService } from './competition.service';

@Module({
  imports: [],
  controllers: [CompetitionsController],
  providers: [PrismaService, CompetitionService],
  exports: [CompetitionService],
})
export class CompetitionModule {}