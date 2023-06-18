import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services//user.service';

import * as bcrypt from 'bcrypt';
import { JWTService } from '../strategies/jwt-strategy/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
  ) {}

  async signUp(dto: any) {
    const { email } = dto;
    const user = await this.userService.findOneByField(email);

    if (user) {
      throw new HttpException(
        'User already exists please provide new email',
        HttpStatus.CONFLICT,
      );
    }

    const newUser = await this.userService.createUser(dto);

    const { hashedPassword, codes, ...result } = newUser.toObject({
      versionKey: false,
    });

    const token = this.jwtService.jwtToken(result);

    return {
      ...result,
      token,
    };
  }

  signIn(dto: any) {
    return {
      ...dto,
      token: this.jwtService.jwtToken(dto),
    };
  }

  async validate(email: string, password: string) {
    const user = await this.userService.findOneByField(email);

    if (user && user && (await bcrypt.compare(password, user.hashedPassword))) {
      const { hashedPassword, codes, ...result } = user.toObject({
        versionKey: false,
      });
      return result;
    }
    return null;
  }
}
