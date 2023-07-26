import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { Garment } from './garment.schema';
import { CreateGarmentDto } from './create-garment.dto';
import { GarmentService } from './garment.service';
import { VerifyJwtService } from 'src/common/user/Infrastructure/verifyJwt.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('garments')
export class GarmentController {
  constructor(
    private readonly garmentService: GarmentService,
    private readonly verifyJwtService: VerifyJwtService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGarmentDto: CreateGarmentDto,
    @Req() request: Request,
  ): Promise<Garment> {
    const jwt = request.headers.authorization?.split(' ')[1];
    if (jwt) {
      const decoded = await this.verifyJwtService.verifyJwt(jwt);
      if (decoded) {
        if (file) {
          createGarmentDto.imagePath = file.path;
        }
        console.log(createGarmentDto);
        return this.garmentService.create(createGarmentDto);
      }
    }
    console.log('no jwt');
    return null;
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async create(@UploadedFile() file: Express.Multer.File): Promise<any> {
  //   if (file) {
  //     // Aquí puedes acceder a la ruta temporal del archivo en el servidor
  //     const filePath = file.path;
  //     console.log('Ruta del archivo en el servidor:', filePath);

  //     // Realiza aquí la lógica necesaria para procesar el archivo, como moverlo a una ubicación permanente, etc.
  //     // Luego, devuelve la ruta o cualquier otra información relevante sobre el archivo, como desees.
  //     // Por ejemplo:
  //     return { filePath };
  //   } else {
  //     // Si no se proporcionó ningún archivo, maneja el escenario adecuadamente
  //     throw new Error('No se proporcionó ningún archivo.');
  //   }
  // }

  @Get('byUser/:userId')
  async findByUser(
    @Param('userId') userId: string,
    @Req() request: Request,
  ): Promise<Garment[]> {
    const jwt = request.headers.authorization?.split(' ')[1];
    if (jwt) {
      const decoded = await this.verifyJwtService.verifyJwt(jwt);
      if (decoded) {
        return this.garmentService.findByUser(userId);
      }
    }
    console.log('no jwt');
    return null;
  }
}
