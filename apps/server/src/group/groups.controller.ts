import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupService) {}

  // CRUD для групп: Создание группы
  @Post()
  async createGroup(@Body() dto: CreateGroupDto) {
    return this.groupService.createGroup(dto);
  }

  // Чтение списка групп
  @Get()
  async findAllGroups() {
    return this.groupService.findAllGroups();
  }

  // Чтение конкретной группы
  @Get(':id')
  async findGroupById(@Param('id') id: string) {
    return this.groupService.findGroupById(id);
  }

  // Обновление группы
  @Put(':id')
  async updateGroup(@Param('id') id: string, @Body() dto: UpdateGroupDto) {
    return this.groupService.updateGroup(id, dto);
  }

  // Удаление группы
  @Delete(':id')
  async removeGroup(@Param('id') id: string) {
    return this.groupService.removeGroup(id);
  }
}

interface CreateGroupDto {
  name: string;
  organizerId?: string;
}

interface UpdateGroupDto {
  name?: string;
  organizerId?: string;
}