import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Infrastructure/auth.module';
import { BarCodeModule } from './barCode/Infrastructure/barCode.module';

@Module({
  imports: [AuthModule, BarCodeModule],
})
export class AppModule {}
