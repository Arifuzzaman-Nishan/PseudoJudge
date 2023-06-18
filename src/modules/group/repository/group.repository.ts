import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../shared/baseRepository/base.repository';
import { Group, GroupDocument } from '../schemas/group.schema';

@Injectable()
export class GroupRepository extends BaseRepository<GroupDocument> {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<GroupDocument>,
  ) {
    super(groupModel);
  }
}
