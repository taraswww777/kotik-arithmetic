import { Controller, Get, Query } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { StatsService } from './stats.service';

interface StatsRequestDto extends Omit<Parameters<typeof statsRequestSchema>[0], keyof typeof statsRequestSchema> {}

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  getStats(@Query() query?: StatsRequestDto) {
    return this.statsService.getStats(query);
  }

  @Get(':difficulty')
  getStatsByDifficulty(
    @Param('difficulty') difficulty: string,
    @Query() params?: { page?: number; limit?: number },
  ) {
    return this.statsService.getStats({ difficulty });
  }
}