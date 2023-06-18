import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: any) {
    const { password, ...restDto } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    restDto.hashedPassword = hashedPassword;

    return this.userRepository.create(restDto);
  }

  findOneByField(email: string) {
    return this.userRepository.findOneByField({
      email,
    });
  }

  findAllUser() {
    return this.userRepository.findAll({
      hashedPassword: 0,
    });
  }

  findOneUser(id: string) {
    return this.userRepository.findOne(id, {
      hashedPassword: 0,
    });
  }

  deleteOneUser(id: string) {
    return this.userRepository.delete({
      _id: id,
    });
  }
}
