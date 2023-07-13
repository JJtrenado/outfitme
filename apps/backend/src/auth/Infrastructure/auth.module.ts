import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { authService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { getUser } from '../Application/getUser.service';
import { googleService } from '../Infrastructure/google.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    authService,
    getUser,
    {
      provide: 'IGoogleService',
      useClass: googleService,
    },
  ],
})
export class AuthModule {}
