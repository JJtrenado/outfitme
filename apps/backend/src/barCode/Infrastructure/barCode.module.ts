import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './barCode.service';
import { UsersController } from './barCode.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [AuthService],
})
export class BarCodeModule {}
