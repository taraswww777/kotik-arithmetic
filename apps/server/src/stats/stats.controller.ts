import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { StatsService } from './stats.service';

interface StatsRequestDto extends Omit<Parameters<typeof statsRequestSchema>[0], keyof typeof statsRequestSchema> {}

interface SaveGameResultDto {
  userId: string;
  crosswordId: string;
  timeSpent: number;
  mistakes: number;
  operations: string[];
  difficulty: string;
}

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  // Получить общую статистику
  @Get()
  getStats(@Query() query?: StatsRequestDto) {
    return this.statsService.getStats(query);
  }

  // Получить статистику по сложности
  @Get(':difficulty')
  getStatsByDifficulty(
    @Param('difficulty') difficulty: string,
    @Query() params?: { page?: number; limit?: number },
  ) {
    return this.statsService.getStats({ difficulty });
  }

  // Сохранить результат игры на сервер
  @Post('game-result')
  saveGameResult(@Body() dto: SaveGameResultDto) {
    return this.statsService.saveGameResult(
      dto.userId,
      dto.crosswordId,
      dto,
    );
  }

  // Получить историю результатов пользователя
  @Get('user/:userId')
  getUserResults(@Param('userId') userId: string) {
    return this.statsService.getUserResults(userId);
  }

  // Получить топ-игроков
  @Get('top-players')
  getTopPlayers(@Query('limit') limit?: number) {
    const limitNum = Number(limit) || 10;
    return this.statsService.getTopPlayers(limitNum);
  }

  // Получить распределение по сложности
  @Get('difficulty-distribution')
  getDifficultyDistribution() {
    return this.statsService.getDifficultyDistribution();
  }
}