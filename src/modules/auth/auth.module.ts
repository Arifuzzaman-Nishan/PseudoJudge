import { Module } from '@nestjs/common';
import { JWTModule } from './strategies/jwt-strategy/jwt.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/passport/local.strategy';

@Module({
  imports: [UserModule, PassportModule, JWTModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
