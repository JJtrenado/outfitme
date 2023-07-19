import { Module } from '@nestjs/common';
import { GarmentController } from './garment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Garment, GarmentSchema } from './garment.schema';
import { GarmentService } from './garment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Garment.name, schema: GarmentSchema }]),
    MongooseModule.forRoot(
      `mongodb+srv://trenadojuanjo:${process.env.DB_ADMIN_PASSWORD}@cluster0.vo0rone.mongodb.net/outfitme?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [GarmentController],
  providers: [GarmentService],
})
export class GarmentModule {}
