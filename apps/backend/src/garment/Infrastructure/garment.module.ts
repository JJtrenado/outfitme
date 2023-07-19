import { Module } from '@nestjs/common';
import { GarmentController } from './garment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Garment, GarmentSchema } from './garment.schema';
import { GarmentService } from './garment.service';
import { verifyJwtService } from 'src/common/Infrastructure/verifyJwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Garment.name, schema: GarmentSchema }]),
    MongooseModule.forRoot(
      `mongodb+srv://trenadojuanjo:${process.env.DB_ADMIN_PASSWORD}@cluster0.vo0rone.mongodb.net/outfitme?retryWrites=true&w=majority`,
    ),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [GarmentController],
  providers: [GarmentService, verifyJwtService],
})
export class GarmentModule {}
