import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth-service.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [GoogleAuthService],
})
export class AppModule {}
