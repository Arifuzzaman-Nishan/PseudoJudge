import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompilerboxService } from '../../compilerbox/services/compilerbox.service';
import { helper } from 'src/shared/utils/helper';
import { promises as fs } from 'fs';
import { CodeRepository } from '../repository/code.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { ProblemRepository } from '../../problem/repository/problem.repository';

@Injectable()
export class CodeService {
  constructor(
    private readonly compilerboxService: CompilerboxService,
    private readonly codeRepository: CodeRepository,
    private readonly userRepository: UserRepository,
    private readonly problemRepository: ProblemRepository,
  ) {}

  private async prepareDto(dto: any, username: string, lang: string) {
    const rdn = await helper.random(10);
    dto.path = process.env.PWD as string;
    dto.codeFolderPath = `${dto.path}/compilerutils/tmp/${username}-${rdn}`;
    dto.utilsPath = `compilerutils/utils`;
    dto.codeFileName = `a.${lang}`;
    dto.vmName = `compilebox`;
    return dto;
  }

  async codeCompile(dto: any) {
    const { lang, username } = dto;

    dto = { ...(await this.prepareDto(dto, username, lang)) };
    dto.dockerRunCommand = `docker run --rm -v ${dto.codeFolderPath}:/usercode ${dto.vmName} /usercode/compiler.sh`;

    await this.compilerboxService.codeCompile(dto);

    const errorData = await fs.readFile(
      `${dto.codeFolderPath}/error.txt`,
      'utf8',
    );

    const outputData = await fs.readFile(
      `${dto.codeFolderPath}/output.txt`,
      'utf8',
    );

    await fs.rm(dto.codeFolderPath, { recursive: true });

    if (!errorData.trim()) {
      // console.log('File is empty');
      return {
        output: outputData,
      };
    } else {
      return {
        error: errorData.replace(/\/usercode\/a\.cpp:\d+:\d+:/, '').trim(),
      };
    }
  }

  async codeSubmit(dto: any) {
    const { userId, lang, username, timelimit, memorylimit } = dto;

    dto = { ...(await this.prepareDto(dto, username, lang)) };
    dto.dockerRunCommand = `docker run --rm -v ${dto.codeFolderPath}:/usercode ${dto.vmName} /usercode/submit.sh ${timelimit} ${memorylimit}`;

    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const problem = await this.problemRepository.findOne(dto.problemId);

    if (!problem) {
      throw new HttpException('Problem not found', HttpStatus.NOT_FOUND);
    }

    const code = await this.codeRepository.create({
      submittedCode: dto.code,
      lang: dto.lang,
      codeFolderPath: dto.codeFolderPath,
      problem: problem,
      user: user,
    });

    await user.save();

    // here running the judge container and gives the verdict...
    await this.compilerboxService.codeSubmit(dto);

    const errorData = (
      await fs.readFile(`${dto.codeFolderPath}/results/error.txt`, 'utf8')
    )
      .replace(/\/usercode\/a\.cpp:\d+:\d+:/, '')
      .trim();

    const verdict = (
      await fs.readFile(`${dto.codeFolderPath}/results/verdict.txt`, 'utf8')
    )
      .replace(/\n/g, '')
      .trim();

    if (!errorData) {
      await this.codeRepository.updateOne(
        { _id: code._id },
        {
          $set: {
            verdict: verdict,
          },
        },
      );
      return {
        verdict,
      };
    } else {
      await this.codeRepository.updateOne(
        { _id: code._id },
        {
          $set: {
            verdict: verdict,
            codeError: errorData,
          },
        },
      );
      return {
        error: errorData,
        verdict,
      };
    }
  }
}
