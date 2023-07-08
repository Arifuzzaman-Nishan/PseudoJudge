import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Problem } from '../../problem/schemas/problem.schema';
import { User } from '../../user/schemas/user.schema';

export type CodeDocument = HydratedDocument<Code>;

// export enum Verdict {
//   PENDING = 'PENDING',
//   ACCEPTED = 'ACCEPTED',
//   WRONG_ANSWER = 'WRONG ANSWER',
//   RUNTIME_ERROR = 'RUNTIME ERROR',
//   TIME_LIMIT_EXCEEDED = 'TIME LIMIT EXCEEDED',
//   COMPILATION_ERROR = 'COMPILATION ERROR',
//   MEMORY_LIMIT_EXCEEDED = 'MEMORY LIMIT EXCEEDED',
//   SEGMENTATION_FAULT = 'SEGMENTATION FAULT',
//   PRESENTATION_ERROR = 'PRESENTATION ERROR',
//   ABNORMAL_TERMINATION = 'ABNORMAL TERMINATION',
// }

export enum CodeLang {
  CPP = 'cpp',
  JAVA = 'java',
  PYTHON = 'python',
}

@Schema({ timestamps: true })
export class Code {
  @Prop({
    required: true,
  })
  submittedCode: string;

  @Prop({
    required: true,
    default: 'Pending',
  })
  verdict: string;

  @Prop({
    default: null,
  })
  codeError: string;

  @Prop({
    required: true,
  })
  memory: string;

  @Prop({
    required: true,
    enum: CodeLang,
    default: CodeLang.CPP,
  })
  lang: CodeLang;

  @Prop({
    default: null,
  })
  codeFolderPath: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
  })
  problem: Problem;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
