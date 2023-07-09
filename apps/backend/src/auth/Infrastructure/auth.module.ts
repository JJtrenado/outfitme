import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { generateJwt } from '../Application/generateJwt.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [generateJwt],
})
export class AuthModule {}
