import { Injectable } from '@nestjs/common';
import { BaseCompilerboxService } from './base.compilerbox.service';
import { ProblemRepository } from '../../problem/repository/problem.repository';

@Injectable()
export class CompilerboxService extends BaseCompilerboxService {
  constructor(protected readonly problemRepository: ProblemRepository) {
    super(problemRepository);
  }

  async codeCompile(dto: any) {
    try {
      await this.prepareForCodeCompile(dto);
      await this.runCommand(dto.dockerRunCommand);
    } catch (err: any) {
      // console.log('Error in codeCompile: ', err.message);
    }
  }

  async codeSubmit(dto: any) {
    try {
      await this.prepareForCodeSubmit(dto);
      await this.runCommand(dto.dockerRunCommand);
    } catch (err: any) {
      console.log('Error in codeSubmit: ', err.message);
    }
  }
}
