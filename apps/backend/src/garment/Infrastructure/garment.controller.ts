import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Garment } from '../Domain/garment.schema';
import { CreateGarmentDto } from '../Application/create-garment.dto';
import { GarmentService } from '../Application/garment.service';
import { VerifyJwtService } from 'src/common/user/Infrastructure/verifyJwt.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { resolve } from 'path';

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
}
