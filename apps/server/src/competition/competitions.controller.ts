import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CompetitionService } from './competition.service';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionService: CompetitionService) {}

  // CRUD для соревнований: Создание соревнования
  @Post()
  async createCompetition(@Body() dto: CreateCompetitionDto) {
    return this.competitionService.createCompetition(dto);
  }

  // Чтение списка соревнований
  @Get()
  async findAllCompetitions() {
    return this.competitionService.findAllCompetitions();
  }

  // Чтение конкретного соревнования
  @Get(':id')
  async findCompetitionById(@Param('id') id: string) {
    return this.competitionService.findCompetitionById(id);
  }

  // Обновление соревнования
  @Put(':id')
  async updateCompetition(@Param('id') id: string, @Body() dto: UpdateCompetitionDto) {
    return this.competitionService.updateCompetition(id, dto);
  }

  // Удаление соревнования
  @Delete(':id')
  async removeCompetition(@Param('id') id: string) {
    return this.competitionService.removeCompetition(id);
  }

  /**
   * Регистрация участника в соревновании (создание записи CompetitionEntry)
   */
  @Post(':id/entries')
  async registerParticipant(
    @Param('id') id: string,
    @Body() dto: { userId: string },
  ) {
    return this.competitionService.registerParticipant(id, dto.userId);
  }

  /**
   * Получение всех записей участников соревнования
   */
  @Get(':id/entries')
  async getCompetitionEntries(@Param('id') id: string) {
    return this.competitionService.getCompetitionEntries(id);
  }
}

interface CreateCompetitionDto {
  name: string;
  description?: string;
  startDate?: string; // ISO datetime
  endDate?: string;   // ISO datetime
}

interface UpdateCompetitionDto {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}