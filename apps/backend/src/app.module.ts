import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Infrastructure/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
