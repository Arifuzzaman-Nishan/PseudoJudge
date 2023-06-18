import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Problem, ProblemDocument } from '../../problem/schemas/problem.schema';
import { BaseRepository } from '../../../shared/baseRepository/base.repository';

@Injectable()
export class ProblemRepository extends BaseRepository<ProblemDocument> {
  constructor(
    @InjectModel(Problem.name)
    private readonly problemModel: Model<ProblemDocument>,
  ) {
    super(problemModel);
  }
}
