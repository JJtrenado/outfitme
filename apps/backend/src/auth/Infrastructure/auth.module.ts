import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { generateJwt } from '../Application/generateJwt.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { getUser, IGoogleService } from '../Application/getUser.service'; // Importa la interfaz también
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
      provide: 'IGoogleService', // Define el nombre del proveedor
      useClass: GoogleService, // Asocia el proveedor con la implementación
    },
  ],
})
export class AuthModule {}
