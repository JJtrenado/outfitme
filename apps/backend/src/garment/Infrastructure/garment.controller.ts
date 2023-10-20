import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Garment } from './garment.schema';
import { CreateGarmentDto } from '../Application/create-garment.dto';
import { GarmentService } from './garment.service';
import { VerifyJwtService } from 'src/common/user/Infrastructure/verifyJwt.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { resolve } from 'path';

@Controller('garments')
export class GarmentController {
  constructor(
    private readonly verifyJwtService: VerifyJwtService,
    private readonly garmentService: GarmentService,
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
      if (decoded && file) {
        createGarmentDto.imagePath = file.path;
        console.log(createGarmentDto);
        return this.garmentService.create(createGarmentDto);
      }
    }
    console.log('no jwt');
    return null;
  }

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

  @Get('/uploads/:imageName')
  serveImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = resolve(process.cwd(), 'uploads', imageName);
    return res.sendFile(imagePath);
  }

  @Delete(':barCode')
  async delete(
    @Param('barCode') barCode: string,
    @Req() request: Request,
  ): Promise<boolean> {
    const jwt = request.headers.authorization?.split(' ')[1];
    if (jwt) {
      const decoded = await this.verifyJwtService.verifyJwt(jwt);
      if (decoded) {
        return this.garmentService.deleteByBarCode(barCode);
      }
    }
    console.log('no jwt');
    return false;
  }

  @Patch('byBarcode/:barCode/available')
  async updateAvailabilityByBarCode(
    @Param('barCode') barCode: string,
    @Body() updateAvailabilityDto: { available: boolean },
    @Req() request: Request,
  ): Promise<Garment> {
    const jwt = request.headers.authorization?.split(' ')[1];
    if (jwt) {
      const decoded = await this.verifyJwtService.verifyJwt(jwt);
      if (decoded) {
        return this.garmentService.updateAvailabilityByBarCode(
          barCode,
          updateAvailabilityDto.available,
        );
      }
    }
    console.log('no jwt');
    return null;
  }
}
