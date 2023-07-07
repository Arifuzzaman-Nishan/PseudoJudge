import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Problem } from '../../problem/schemas/problem.schema';
import { User } from '../../user/schemas/user.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema({ timestamps: true })
export class Group {
  @Prop({
    unique: true,
    required: true,
  })
  groupName: string;

  @Prop({ required: true })
  enrollmentKey: string;

  @Prop({ required: true })
  groupUrl: string;

  @Prop({
    required: true,
    default: 0,
  })
  totalMembers: number;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
      },
    ],
    default: [],
  })
  problems: Problem[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  })
  users: User[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
