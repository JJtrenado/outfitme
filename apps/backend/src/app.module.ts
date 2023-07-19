import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Infrastructure/auth.module';
import { BarCodeModule } from './barCode/Infrastructure/barCode.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GarmentModule } from './garment/Infrastructure/garment.module';

@Module({
  imports: [
    AuthModule,
    BarCodeModule,
    GarmentModule,
    MongooseModule.forRoot(
      `mongodb+srv://trenadojuanjo:${process.env.DB_ADMIN_PASSWORD}@cluster0.vo0rone.mongodb.net/outfitme?retryWrites=true&w=majority`,
    ),
    ,
  ],
})
export class AppModule {}
