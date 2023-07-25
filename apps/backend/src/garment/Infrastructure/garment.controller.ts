import {
  Body,
  Controller,
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
        console.log('decoded');
        if (file) {
          console.log('file');
          createGarmentDto.imagePath = file.path;
          console.log(createGarmentDto);
        }
        return this.garmentService.create(createGarmentDto);
      }
    }
    console.log('no jwt');
    return null;
  }
}
