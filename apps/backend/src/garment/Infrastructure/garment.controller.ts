import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Garment } from '../Domain/garment.schema';
import { CreateGarmentDto } from '../Application/create-garment.dto';
import { GarmentService } from '../Application/garment.service';
import { verifyJwtService } from 'src/common/Infrastructure/verifyJwt.service';

@Controller('garments')
export class GarmentController {
  constructor(
    private readonly garmentService: GarmentService,
    private readonly VerifyJwtService: verifyJwtService,
  ) {}

  @Post()
  async create(
    @Body() createGarmentDto: CreateGarmentDto,
    @Req() request: Request,
  ): Promise<Garment> {
    const jwt = request.headers.authorization?.split(' ')[1];
    if (jwt) {
      const decoded = await this.VerifyJwtService.verifyJwt(jwt);
      if (decoded) {
        return this.garmentService.create(createGarmentDto);
      }
    } else {
      return null;
    }
  }
}
