import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Infrastructure/auth.module';
import { BarCodeModule } from './barCode/Infrastructure/barCode.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    BarCodeModule,
    MongooseModule.forRoot(
      'mongodb+srv://trenadojuanjo:ksBQaehavYshWtPz@cluster0.vo0rone.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
