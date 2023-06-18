import { Module } from '@nestjs/common';
import { ProblemController } from './controllers/problem.controller';
import { ProblemService } from './services/problem.service';
import { ProblemRepository } from './repository/problem.repository';
import { ProblemDetailsRepository } from './repository/problem-details.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Problem, ProblemSchema } from './schemas/problem.schema';
import {
  ProblemDetails,
  ProblemDetailsSchema,
} from './schemas/problem-details.schema';
import { ProblemDetailsModule } from './problem-details.module';
import { deleteRelatedProblemDetails } from './middleware/problem.document-middleware';
import { CrawlerModule } from '../crawler/crawler.module';

@Module({
  imports: [
    ProblemDetailsModule,
    MongooseModule.forFeature([
      {
        name: ProblemDetails.name,
        schema: ProblemDetailsSchema,
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        imports: [ProblemDetailsModule],
        name: Problem.name,
        useFactory: (problemDetailsRepository: ProblemDetailsRepository) => {
          const schema = ProblemSchema;
          schema.pre(
            'findOneAndRemove',
            deleteRelatedProblemDetails(problemDetailsRepository),
          );
          return schema;
        },
        inject: [ProblemDetailsRepository],
      },
    ]),
    CrawlerModule,
  ],
  controllers: [ProblemController],
  providers: [ProblemService, ProblemRepository],
  exports: [ProblemRepository],
})
export class ProblemModule {}
