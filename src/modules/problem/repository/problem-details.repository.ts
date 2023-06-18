import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProblemDetails,
  ProblemDetailsDocument,
} from '../../problem/schemas/problem-details.schema';
import { BaseRepository } from '../../../shared/baseRepository/base.repository';

@Injectable()
export class ProblemDetailsRepository extends BaseRepository<ProblemDetailsDocument> {
  constructor(
    @InjectModel(ProblemDetails.name)
    private readonly problemDetailsModel: Model<ProblemDetailsDocument>,
  ) {
    super(problemDetailsModel);
  }
}
