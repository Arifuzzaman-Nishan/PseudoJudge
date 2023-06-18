import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../shared/baseRepository/base.repository';
import { Code, CodeDocument } from '../schemas/code.schema';

@Injectable()
export class CodeRepository extends BaseRepository<CodeDocument> {
  constructor(
    @InjectModel(Code.name)
    private readonly codeModel: Model<CodeDocument>,
  ) {
    super(codeModel);
  }
}
