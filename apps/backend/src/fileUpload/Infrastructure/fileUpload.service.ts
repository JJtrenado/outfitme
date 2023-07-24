import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File) {
    const fileName = this.generateFileName(file.originalname);
    const filePath = this.getFilePath(fileName);

    await this.saveFile(file, filePath);

    return { message: 'Archivo subido correctamente' };
  }

  private generateFileName(originalName: string): string {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2);
    const extension = originalName.split('.').pop();
    return `${timestamp}-${randomString}.${extension}`;
  }

  private getFilePath(fileName: string): string {
    return join('./uploads', fileName); // Ruta donde se guardará el archivo
  }

  private async saveFile(
    file: Express.Multer.File,
    filePath: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const writeStream = createWriteStream(filePath);
      writeStream.on('finish', () => resolve());
      writeStream.on('error', (error) => reject(error));
      writeStream.write(file.buffer);
      writeStream.end();
    });
  }
}
