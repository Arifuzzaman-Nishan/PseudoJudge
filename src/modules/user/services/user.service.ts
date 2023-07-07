import { Injectable, Query } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { GroupRepository } from 'src/modules/group/repository/group.repository';
import { UserRole } from '../schemas/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
  ) {}

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

  async findAllUser(query: { group: string; groupId: string }) {
    // console.log('query is ', query);

    if (query.group === 'in') {
      const usersInGroup = await this.groupRepository.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'users',
            foreignField: '_id',
            as: 'userInfo',
          },
        },
        {
          $match: {
            _id: new mongoose.Types.ObjectId(query.groupId),
            'userInfo.role': { $ne: UserRole.ADMIN },
          },
        },
        {
          $project: {
            _id: 0,
            'userInfo.hashedPassword': 0,
            'userInfo.__v': 0,
          },
        },
        {
          $project: {
            userInfo: 1,
          },
        },
        {
          $unwind: '$userInfo',
        },
        {
          $replaceRoot: {
            newRoot: '$userInfo',
          },
        },
      ]);

      return usersInGroup;
    } else if (query.group === 'notIn') {
      const usersNotInGroup = await this.userRepository.aggregate([
        {
          $lookup: {
            from: 'groups',
            localField: '_id',
            foreignField: 'users',
            as: 'groupInfo',
          },
        },
        {
          $match: {
            groupInfo: { $eq: [] },
            role: { $ne: UserRole.ADMIN },
          },
        },
        {
          $project: {
            hashedPassword: 0,
            __v: 0,
            groupInfo: 0,
          },
        },
      ]);
      return usersNotInGroup;
    }
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
