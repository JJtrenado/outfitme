import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadController } from './fileUpload.controller';
import { FileUploadService } from './fileUpload.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Ruta donde se guardarán los archivos subidos
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
