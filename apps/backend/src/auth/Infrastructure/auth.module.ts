import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { generateJwt } from '../Application/generateJwt.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { getPayload } from './getPayload.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [generateJwt, getPayload],
})
export class AuthModule {}
