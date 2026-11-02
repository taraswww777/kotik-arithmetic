import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { statsRequestSchema, gameResultSchema } from 'shared-validation';
import { PrismaService } from '../database/database.module';

interface StatsRequestDto extends Omit<Parameters<typeof statsRequestSchema>[0], keyof typeof statsRequestSchema> {}

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  // Получить общую статистику
  async getStats(params: { difficulty?: string }): Promise<any> {
    const validatedData = statsRequestSchema.safeParse(params);
    
    if (!validatedData.success) {
      throw new Error('Некорректные параметры запроса');
    }

    const { difficulty } = validatedData.data;
    
    let query: Prisma.GameResultQueryInput;
    
    if (difficulty) {
      query = { where: { difficulty } };
    } else {
      query = {};
    }
    
    // Получаем все результаты для агрегации
    const results = await this.prisma.gameResult.findMany({
      where: query,
      select: {
        solvedCount: true,
        totalSolved: true,
        timeSpent: true,
        mistakes: true,
        difficultyLevel: true,
        createdAt: true,
      },
    });

    const totalGames = results.length;
    if (totalGames === 0) {
      return {
        totalGames: 0,
        solvedCount: 0,
        averageTimeSpent: 0,
        averageMistakes: 0,
        difficultyCounts: {},
      };
    }

    const totalSolved = results.reduce((sum, r) => sum + r.solvedCount, 0);
    const totalTimeSpent = results.reduce((sum, r) => sum + r.timeSpent, 0);
    const totalMistakes = results.reduce((sum, r) => sum + r.mistakes, 0);

    const difficultyCounts: Record<string, number> = {};
    results.forEach(r => {
      if (r.difficultyLevel) {
        difficultyCounts[r.difficultyLevel] = (difficultyCounts[r.difficultyLevel] || 0) + 1;
      }
    });

    return {
      totalGames,
      solvedCount: totalSolved,
      averageTimeSpent: Math.round((totalTimeSpent / totalGames) * 100) / 100,
      averageMistakes: Math.round((totalMistakes / totalGames) * 100) / 100,
      difficultyCounts,
    };
  }

  // Сохранить результат игры
  async saveGameResult(
    userId: string,
    crosswordId: string,
    stats: { timeSpent: number; mistakes: number; operations: string[]; difficulty: string },
  ): Promise<void> {
    try {
      const completedAt = new Date();

      await this.prisma.gameResult.create({
        data: {
          userId,
          crosswordId,
          timeSpent: stats.timeSpent,
          mistakes: stats.mistakes,
          operations: stats.operations,
          difficulty: stats.difficulty,
          completedAt,
        },
      });
    } catch (error) {
      console.error('Ошибка сохранения результата игры:', error);
      throw new Error('Не удалось сохранить результат');
    }
  }

  // Получить результаты пользователя
  async getUserResults(userId: string): Promise<any[]> {
    return this.prisma.gameResult.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { email: true },
        },
      },
      take: 100, // ограничение количества записей
    });
  }

  // Получить топ-пользователей по количеству решённых кроссвордов
  async getTopPlayers(limit: number = 10): Promise<any[]> {
    return this.prisma.gameResult.groupBy({
      by: ['userId'],
      _count: true,
    }).orderBy({
      _count: Prisma.SortOrder.Descending,
    }).take(limit).then(({ userId, _count }) => ({
      userId,
      gameCount: _count,
    }));
  }

  // Получить статистику по сложности для всех пользователей
  async getDifficultyDistribution(): Promise<Record<string, number>> {
    const results = await this.prisma.gameResult.groupBy({
      by: ['difficulty'],
      _count: true,
    });

    return results.reduce((acc, r) => {
      acc[r.difficulty] = r._count;
      return acc;
    }, {} as Record<string, number>);
  }
}