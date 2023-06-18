import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupEnrollmentKey } from '../utils/group.enrollmentkey';
import { GroupRepository } from '../repository/group.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { ProblemRepository } from 'src/modules/problem/repository/problem.repository';
import { UserRole } from 'src/modules/user/schemas/user.schema';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly userRepository: UserRepository,
    private readonly problemRepository: ProblemRepository,
    private readonly groupEnrollmentKey: GroupEnrollmentKey,
  ) {}

  // group basic functionality
  async createGroup(dto: any) {
    const user = await this.userRepository.findOneByField({
      email: dto.email,
    });

    if (!user || user.role !== UserRole.ADMIN) {
      throw new HttpException(
        'User not found or not an admin',
        HttpStatus.NOT_FOUND,
      );
    }

    const { enrollmentKey, enrollmentKeyExpiration } =
      this.groupEnrollmentKey.generateEnrollmentKey();

    return this.groupRepository.create({
      groupName: dto.groupName,
      enrollmentKey,
      enrollmentKeyExpiration,
    });
  }

  findAllGroups() {
    return this.groupRepository.findAll();
  }

  findAllGroupsWithProblems() {
    return this.groupRepository.findWithPopulate({}, 'problems');
  }

  // group user functionality
  async userJoinGroup(dto: any) {
    const group = await this.groupRepository.findOneByField({
      enrollmentKey: dto.enrollmentKey,
    });

    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (new Date() > group.enrollmentKeyExpiration) {
      throw new HttpException('Enrollment key expired', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneByField({ email: dto.email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    group.users.push(user);
    await group.save();

    return { message: 'User successfully joined group' };
  }

  async usersAddedIntoGroup(dto: any) {
    // users array list and which group to add
    const { users, groupId, email } = dto;

    const user = await this.userRepository.findOneByField({
      email: email,
    });

    if (!user || user.role !== UserRole.ADMIN) {
      throw new HttpException(
        'User not found or not an admin',
        HttpStatus.NOT_FOUND,
      );
    }

    const group = await this.groupRepository.findOne(groupId);

    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    return this.groupRepository.updateOne(
      {
        _id: groupId,
      },
      {
        $addToSet: {
          users: {
            $each: users,
          },
        },
      },
    );
  }

  async userRemovedFromGroup(dto: any) {
    const { userId, groupId } = dto;

    const group = await this.groupRepository.findOne(groupId);

    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    return this.groupRepository.updateOne(
      {
        _id: groupId,
      },
      {
        $pull: {
          users: userId,
        },
      },
    );
  }

  // group problem functionality...
  async problemsAddedIntoGroup(dto: any) {
    // problemId
    const { problemIds, groupId } = dto;

    // find the specific group...
    const group = await this.groupRepository.findOne(groupId);

    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    return this.groupRepository.updateOne(
      {
        _id: groupId,
      },
      {
        $addToSet: {
          problems: {
            $each: problemIds,
          },
        },
      },
    );
  }

  async problemRemovedFromGroup(dto: any) {
    const { problemId, groupId } = dto;

    // find the specific group...
    const group = await this.groupRepository.findOne(groupId);

    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    return this.groupRepository.updateOne(
      {
        _id: groupId,
      },
      {
        $pull: {
          problems: problemId,
        },
      },
    );
  }
}