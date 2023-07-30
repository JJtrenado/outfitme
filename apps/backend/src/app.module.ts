import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Infrastructure/auth.module';
import { GarmentModule } from './garment/Infrastructure/garment.module';

@Module({
  imports: [AuthModule, GarmentModule],
})
export class AppModule {}
