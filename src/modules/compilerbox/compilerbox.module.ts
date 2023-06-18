import { Module } from '@nestjs/common';
import { CompilerboxService } from './services/compilerbox.service';
import { ProblemModule } from '../problem/problem.module';

@Module({
  imports: [ProblemModule],
  providers: [CompilerboxService],
  exports: [CompilerboxService],
})
export class CompilerboxModule {}
