import { Body, Controller, Post } from '@nestjs/common';
import { Garment } from './garment.schema';
import { CreateGarmentDto } from './create-garment.dto';
import { GarmentService } from './garment.service';

@Controller('garments')
export class GarmentController {
  constructor(private readonly garmentService: GarmentService) {}

  @Post()
  async create(@Body() createGarmentDto: CreateGarmentDto): Promise<Garment> {
    return this.garmentService.create(createGarmentDto);
  }
}
