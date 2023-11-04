import { Module } from '@nestjs/common';
import { GarmentController } from './garment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Garment, GarmentSchema } from './garment.schema';
import { GarmentService } from './garment.service';
import { VerifyJwtService } from 'src/common/user/Infrastructure/verifyJwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { Outfit } from 'src/outfit/Infrastructure/outfit.schema';
import { OutfitService } from 'src/outfit/Infrastructure/outfit.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Garment.name, schema: GarmentSchema }]),
    MongooseModule.forRoot(
      `mongodb+srv://trenadojuanjo:${process.env.DB_ADMIN_PASSWORD}@cluster0.vo0rone.mongodb.net/outfitme?retryWrites=true&w=majority`,
    ),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '9999 years' },
    }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [GarmentController],
  providers: [GarmentService, VerifyJwtService],
})
export class GarmentModule {}
