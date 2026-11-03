import { Module, Global } from '@nestjs/common';
import { JwtConfigService } from './jwt/jwt';

@Global()
@Module({
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtModule {}