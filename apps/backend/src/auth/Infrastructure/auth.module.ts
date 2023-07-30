import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { generateJwt } from './generateJwt.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { getUser } from '../Application/getUser.service';
import { GoogleService } from '../Infrastructure/google.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    generateJwt,
    getUser,
    {
      provide: 'IGoogleService',
      useClass: GoogleService,
    },
  ],
})
export class AuthModule {}
