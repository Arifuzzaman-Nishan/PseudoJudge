import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Code } from '../../code/schemas/code.schema';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // @Prop({
  //   required: true,
  // })
  // firstName: string;

  // @Prop({
  //   required: true,
  // })
  // lastName: string;

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    default: null,
  })
  hashedPassword: string;

  @Prop({
    required: true,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Code',
      },
    ],
    default: [],
  })
  codes: Code[];
}

export const UserSchema = SchemaFactory.createForClass(User);
