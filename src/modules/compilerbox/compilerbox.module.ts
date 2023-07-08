import { Module } from '@nestjs/common';
import { CompilerboxService } from './services/compilerbox.service';
import { ProblemModule } from '../problem/problem.module';
import { VjudgeService } from './services/vjudge.service';

@Module({
  imports: [ProblemModule],
  providers: [CompilerboxService, VjudgeService],
  exports: [CompilerboxService, VjudgeService],
})
export class CompilerboxModule {}
