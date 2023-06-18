import { Injectable } from '@nestjs/common';
import { exec as execCb } from 'child_process';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import { ProblemRepository } from '../../problem/repository/problem.repository';

const exec = promisify(execCb);

@Injectable()
export class BaseCompilerboxService {
  constructor(protected readonly problemRepository: ProblemRepository) {}

  private async createFolder(folderPath: string) {
    await fs.mkdir(folderPath, { recursive: true });
  }

  protected async runCommand(command: string) {
    await exec(command);
  }

  private async writeToFile(filePath: string, data: string) {
    await fs.writeFile(filePath, data);
  }

  private async writeFileFromDatabase(dto: any) {
    console.log('hello...');
    const [dataSets] = await this.problemRepository.findWithPopulate(
      {
        _id: dto.problemId,
      },
      'problemDetails',
      {
        problemDetails: 1,
      },
    );

    const { sampleDataset, testDataset } = dataSets.problemDetails;
    const { sampleInput, sampleOutput } = sampleDataset;
    const { testInput, testOutput } = testDataset;

    const getPath = (folder: string, file: string) =>
      `${dto.codeFolderPath}/${folder}/${file}`;

    // Create necessary folders
    await Promise.all([
      this.createFolder(getPath('input', '')),
      this.createFolder(getPath('output', '')),
    ]);

    // Write input and output files
    await Promise.all([
      this.writeToFile(getPath('input', 'sampleInput.txt'), sampleInput),
      this.writeToFile(getPath('input', 'testInput.txt'), testInput),
      this.writeToFile(getPath('output', 'sampleOutput.txt'), sampleOutput),
      this.writeToFile(getPath('output', 'testOutput.txt'), testOutput),
    ]);
  }

  private async commonPrepare(dto: any) {
    const { codeFolderPath, path, codeFileName, code } = dto;

    await this.createFolder(codeFolderPath);
    await Promise.all([
      this.runCommand(`chmod 755 ${codeFolderPath}`),
      this.runCommand(
        `cp -r ${path}/compilerutils/utils/payload/* ${codeFolderPath}`,
      ),
      this.writeToFile(`${codeFolderPath}/${codeFileName}`, code),
    ]);
    await this.runCommand(`chmod 755 ${codeFolderPath}/${codeFileName}`);
  }

  protected async prepareForCodeCompile(dto: any) {
    const { codeFolderPath, stdin } = dto;
    await this.commonPrepare(dto);
    await this.writeToFile(`${codeFolderPath}/inputFile`, stdin);
  }

  protected async prepareForCodeSubmit(dto: any) {
    await this.commonPrepare(dto);
    await this.writeFileFromDatabase(dto);
  }
}
