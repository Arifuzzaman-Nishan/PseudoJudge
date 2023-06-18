import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Group } from '../../group/schemas/group.schema';
import { DifficultyRating } from '../types/problem.interface';
import { ProblemDetails } from './problem-details.schema';

export type ProblemDocument = HydratedDocument<Problem>;

@Schema({ timestamps: true })
export class Problem {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
    enum: DifficultyRating,
  })
  difficultyRating: DifficultyRating;

  @Prop({
    required: true,
  })
  ojName: string;

  @Prop({
    required: true,
  })
  ojProblemId: string;

  @Prop({
    required: true,
  })
  ojUrl: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
    default: [],
  })
  groups: Group[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProblemDetails',
  })
  problemDetails: ProblemDetails;
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);

/*
 * Delete related problem details when problem is deleted
 */
// ProblemSchema.pre('findOneAndRemove', deleteRelatedProblemDetails);
