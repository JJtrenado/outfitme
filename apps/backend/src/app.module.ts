import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Infrastructure/auth.module';
import { BarCodeModule } from './barCode/Infrastructure/barCode.module';
import { GarmentModule } from './garment/Infrastructure/garment.module';
import { FileUploadModule } from './fileUpload/Infrastructure/fileUpload.module';

@Module({
  imports: [AuthModule, BarCodeModule, GarmentModule, FileUploadModule],
})
export class AppModule {}
