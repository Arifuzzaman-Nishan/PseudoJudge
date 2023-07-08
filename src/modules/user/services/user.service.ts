import { Injectable, Query } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { GroupRepository } from 'src/modules/group/repository/group.repository';
import { UserRole } from '../schemas/user.schema';
import mongoose from 'mongoose';
import { DateTime } from 'luxon';
import { CodeRepository } from 'src/modules/code/repository/code.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
    private readonly codeRepository: CodeRepository,
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

  async statistics(userId: string) {
    const today = DateTime.local().startOf('day');
    const yesterday = today.minus({ days: 1 });
    const weekStart = today.minus({ weeks: 1 });

    const userStatistics = await this.codeRepository.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          verdict: 'Accepted',
        },
      },
      {
        $sort: { createdAt: 1 },
      },
      {
        $group: {
          _id: '$problem',
          createdAt: { $first: '$createdAt' },
          isToday: {
            $first: {
              $cond: [{ $gte: ['$createdAt', today.toJSDate()] }, 1, 0],
            },
          },
          isYesterday: {
            $first: {
              $cond: [
                {
                  $and: [
                    { $gte: ['$createdAt', yesterday.toJSDate()] },
                    { $lt: ['$createdAt', today.toJSDate()] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          isThisWeek: {
            $first: {
              $cond: [{ $gte: ['$createdAt', weekStart.toJSDate()] }, 1, 0],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAccepted: { $sum: 1 },
          acceptedToday: { $sum: '$isToday' },
          acceptedYesterday: { $sum: '$isYesterday' },
          acceptedThisWeek: { $sum: '$isThisWeek' },
        },
      },
    ]);

    return userStatistics;
  }

  async submittedCode(userId: string, period: string) {
    const today = DateTime.local().startOf('day');
    const yesterday = today.minus({ days: 1 });
    const weekly = today.minus({ weeks: 1 });

    let query = {};
    switch (period) {
      case 'today':
        query = {
          createdAt: {
            $gte: today.toJSDate(),
          },
        };
        break;
      case 'yesterday':
        query = {
          createdAt: {
            $gte: yesterday.toJSDate(),
            $lt: today.toJSDate(),
          },
        };
        break;
      case 'weekly':
        query = {
          createdAt: {
            $gte: weekly.toJSDate(),
          },
        };
        break;
      default:
        query = {};
    }

    const userSubmittedCode = await this.codeRepository.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $match: query,
      },
    ]);

    return userSubmittedCode;
  }
}
