import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtConfigModule } from '../config/jwt-config.module';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  imports: [JwtConfigModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}