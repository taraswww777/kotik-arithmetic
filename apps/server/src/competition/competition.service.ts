import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/database.module';

@Injectable()
export class CompetitionService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создание соревнования
   */
  async createCompetition(dto: { 
    name: string; 
    description?: string; 
    startDate?: string; 
    endDate?: string; 
  }) {
    const competition = await this.prisma.competition.create({
      data: {
        name: dto.name,
        description: dto.description || null,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
      include: {
        entries: true,
      },
    });

    return {
      ...competition,
      startDate: competition.startDate instanceof Date 
        ? competition.startDate.toISOString() 
        : competition.startDate,
      endDate: competition.endDate instanceof Date 
        ? competition.endDate.toISOString() 
        : competition.endDate,
    };
  }

  /**
   * Получение всех соревнований
   */
  async findAllCompetitions() {
    const competitions = await this.prisma.competition.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        entries: true,
      },
    });

    return competitions.map(comp => ({
      ...comp,
      startDate: comp.startDate instanceof Date 
        ? comp.startDate.toISOString() 
        : comp.startDate,
      endDate: comp.endDate instanceof Date 
        ? comp.endDate.toISOString() 
        : comp.endDate,
    }));
  }

  /**
   * Получение соревнования по ID
   */
  async findCompetitionById(id: string) {
    const competition = await this.prisma.competition.findUnique({
      where: { id },
      include: {
        entries: true,
      },
    });

    if (!competition) {
      throw new NotFoundException(`Соревнование с ID ${id} не найдено`);
    }

    return {
      ...competition,
      startDate: competition.startDate instanceof Date 
        ? competition.startDate.toISOString() 
        : competition.startDate,
      endDate: competition.endDate instanceof Date 
        ? competition.endDate.toISOString() 
        : competition.endDate,
    };
  }

  /**
   * Обновление соревнования
   */
  async updateCompetition(id: string, dto: { 
    name?: string; 
    description?: string; 
    startDate?: string; 
    endDate?: string; 
  }) {
    const existing = await this.prisma.competition.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Соревнование с ID ${id} не найдено`);
    }

    const updated = await this.prisma.competition.update({
      where: { id },
      data: dto,
    });

    return {
      ...updated,
      startDate: updated.startDate instanceof Date 
        ? updated.startDate.toISOString() 
        : updated.startDate,
      endDate: updated.endDate instanceof Date 
        ? updated.endDate.toISOString() 
        : updated.endDate,
    };
  }

  /**
   * Удаление соревнования
   */
  async removeCompetition(id: string) {
    const existing = await this.prisma.competition.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Соревнование с ID ${id} не найдено`);
    }

    // Удаляем соревнования вместе со всеми записями (cascade delete)
    await this.prisma.competition.delete({
      where: { id },
    });

    return { message: `Соревнование "${existing.name}" успешно удалено` };
  }

  /**
   * Регистрация участника в соревновании (создание CompetitionEntry)
   */
  async registerParticipant(competitionId: string, userId: string) {
    // Проверка существования соревнования
    const competition = await this.prisma.competition.findUnique({
      where: { id: competitionId },
    });

    if (!competition) {
      throw new NotFoundException(`Соревнование с ID ${competitionId} не найдено`);
    }

    // Проверка существования пользователя
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
    }

    // Проверка на дублирование записи (CompetitionEntry имеет unique constraint по compound key)
    const existingEntry = await this.prisma.competitionEntry.findUnique({
      where: {
        competitionId_userId: {
          competitionId,
          userId,
        },
      },
    });

    if (existingEntry) {
      throw new Error(`Пользователь ${userId} уже зарегистрирован в соревновании ${competitionId}`);
    }

    // Создание записи участника
    const entry = await this.prisma.competitionEntry.create({
      data: {
        competitionId,
        userId,
      },
      include: {
        competition: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            userId: true,
            role: true,
          },
        },
      },
    });

    return {
      ...entry,
      competition: entry.competition,
      user: entry.user,
    };
  }

  /**
   * Получение всех записей участников соревнования
   */
  async getCompetitionEntries(competitionId: string) {
    // Проверка существования соревнования
    const competition = await this.prisma.competition.findUnique({
      where: { id: competitionId },
    });

    if (!competition) {
      throw new NotFoundException(`Соревнование с ID ${competitionId} не найдено`);
    }

    const entries = await this.prisma.competitionEntry.findMany({
      where: { competitionId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            userId: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return entries.map(entry => ({
      ...entry,
      user: entry.user, // уже включён в include
    }));
  }
}