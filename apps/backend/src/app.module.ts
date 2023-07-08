import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret, // Reemplaza por tu propia clave secreta
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleAuthService],
})
export class AppModule {}
