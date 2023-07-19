import { Module } from '@nestjs/common';
import { GarmentController } from './garment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Garment, GarmentSchema } from './garment.schema';
import { GarmentService } from './garment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Garment.name, schema: GarmentSchema }]),
  ],
  controllers: [GarmentController],
  providers: [GarmentService],
})
export class GarmentModule {}
