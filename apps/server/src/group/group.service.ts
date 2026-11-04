import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/database.module';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создание группы
   */
  async createGroup(dto: { name: string; organizerId?: string }) {
    const group = await this.prisma.group.create({
      data: {
        name: dto.name,
        organizerId: dto.organizerId || null,
      },
      include: {
        organizer: true,
      },
    });

    return {
      ...group,
      organizer: group.organizer ? {
        id: group.organizer.id,
        email: group.organizer.email,
        userId: group.organizer.userId,
        externalId: group.organizer.externalId,
        role: group.organizer.role,
      } : null,
    };
  }

  /**
   * Получение всех групп
   */
  async findAllGroups() {
    const groups = await this.prisma.group.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        organizer: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                userId: true,
                externalId: true,
                role: true,
              },
            },
          },
        },
      },
    });

    return groups.map(group => ({
      ...group,
      organizer: group.organizer ? {
        id: group.organizer.id,
        email: group.organizer.email,
        userId: group.organizer.userId,
        externalId: group.organizer.externalId,
        role: group.organizer.role,
      } : null,
    }));
  }

  /**
   * Получение группы по ID
   */
  async findGroupById(id: string) {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        organizer: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                userId: true,
                externalId: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }

    return {
      ...group,
      organizer: group.organizer ? {
        id: group.organizer.id,
        email: group.organizer.email,
        userId: group.organizer.userId,
        externalId: group.organizer.externalId,
        role: group.organizer.role,
      } : null,
    };
  }

  /**
   * Обновление группы
   */
  async updateGroup(id: string, dto: { name?: string; organizerId?: string }) {
    const existingGroup = await this.prisma.group.findUnique({
      where: { id },
    });

    if (!existingGroup) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }

    const updatedGroup = await this.prisma.group.update({
      where: { id },
      data: dto,
    });

    return updatedGroup;
  }

  /**
   * Удаление группы
   */
  async removeGroup(id: string) {
    const existingGroup = await this.prisma.group.findUnique({
      where: { id },
    });

    if (!existingGroup) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }

    // Удаляем группу вместе со всеми членами (cascade delete в Prisma по умолчанию)
    await this.prisma.group.delete({
      where: { id },
    });

    return { message: `Группа "${existingGroup.name}" успешно удалена` };
  }
}