import { Injectable } from '@nestjs/common';
import { statsRequestSchema } from 'shared-validation';

@Injectable()
export class StatsService {
  async getStats(params: { difficulty?: string }): Promise<any> {
    const validatedData = statsRequestSchema.safeParse(params);
    
    if (!validatedData.success) {
      throw new Error('Некорректные параметры запроса');
    }
    
    // Здесь будет получение статистики из БД через Prisma
    console.log('Запрос статистики:', params);
    
    return {
      totalUsers: 100,
      totalGames: 5000,
      averageTime: 300,
      mistakes: 25,
    };
  }
}