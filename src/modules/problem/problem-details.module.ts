import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProblemDetails,
  ProblemDetailsSchema,
} from './schemas/problem-details.schema';
import { ProblemDetailsRepository } from './repository/problem-details.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProblemDetails.name,
        schema: ProblemDetailsSchema,
      },
    ]),
  ],
  providers: [ProblemDetailsRepository],
  exports: [ProblemDetailsRepository],
})
export class ProblemDetailsModule {}
