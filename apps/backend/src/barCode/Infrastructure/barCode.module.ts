import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { verifyJwtService } from 'src/common/Infrastructure/verifyJwt.service';
import { UsersController } from './barCode.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UsersController],
  providers: [verifyJwtService],
})
export class BarCodeModule {}
