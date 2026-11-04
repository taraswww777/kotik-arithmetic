import { Module } from '@nestjs/common';
import { PrismaService } from '../database/database.module';
import { GroupsController } from './groups.controller';
import { GroupService } from './group.service';

@Module({
  imports: [],
  controllers: [GroupsController],
  providers: [PrismaService, GroupService],
  exports: [GroupService],
})
export class GroupModule {}