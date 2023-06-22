import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProblemCrawler } from '../../crawler/services/problem.crawler';
import { ProblemRepository } from '../repository/problem.repository';
import { ProblemDetailsRepository } from '../repository/problem-details.repository';
import { TestCaseCrawler } from '../../crawler/services/testcase.crawler';

enum OjName {
  LIGHT_OJ = 'LOJ',
  UVA = 'UVA',
}

@Injectable()
export class ProblemService {
  constructor(
    private readonly problemCrawler: ProblemCrawler,
    private readonly problemRepository: ProblemRepository,
    private readonly problemDetailsRepository: ProblemDetailsRepository,
    private readonly testCaseCrawler: TestCaseCrawler,
  ) {}

  async extractProblem(dto: any) {
    let problemResult;
    if (dto.ojName === OjName.LIGHT_OJ) {
      problemResult = await this.problemCrawler.crawlLightOJProblem(dto);
    } else if (dto.ojName === OjName.UVA) {
      problemResult = await this.problemCrawler.crawlUvaProblem(dto);
    }

    const { testInput, testOutput } = await this.testCaseCrawler.crawlTestCase({
      ojName: dto?.ojName,
      ojProblemId: problemResult?.ojProblemId,
    });

    problemResult = {
      ...problemResult,
      problemDetails: {
        ...problemResult.problemDetails,
        testDataset: {
          testInput,
          testOutput,
        },
      },
    };

    const { title, ojProblemId, problemDetails } = problemResult;

    const findProblem = await this.problemRepository.findOneByField({
      ojProblemId: ojProblemId,
    });

    if (!findProblem) {
      // console.log('problemDetails is ', problemDetails);

      const newProblemDetails = await this.problemDetailsRepository.create(
        problemDetails,
      );

      const newProblem = {
        title,
        difficultyRating: dto.difficultyRating,
        ojName: dto.ojName,
        ojProblemId,
        ojUrl: dto.ojUrl,
        problemDetails: newProblemDetails,
      };

      return this.problemRepository.create(newProblem);
    }

    throw new HttpException('Problem already exists', HttpStatus.CONFLICT);
  }

  findAllProblems() {
    return this.problemRepository.findAll();
  }

  async findOneProblemWithDetails(ojName: string, ojProblemId: string) {
    const [data] = await this.problemRepository.findWithPopulate(
      { ojName, ojProblemId },
      'problemDetails',
      undefined,
      '-testDataset',
    );

    return data;
  }

  async deleteOneProblem(id: string) {
    return this.problemRepository.delete({ _id: id });
  }

  async paginate(page: number, limit: number, query: string) {
    // console.log('page type is ', typeof page);

    if (page < 0 || limit < 0) {
      throw new HttpException(
        'Page or limit must be greater than 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    const searchQuery = query
      ? { title: { $regex: query, $options: 'i' } }
      : {};

    const total = await this.problemRepository.countDocuments(searchQuery);
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages - 1;
    const hasPreviousPage = page > 0;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;

    const problems = await this.problemRepository.findWithPaginate(
      searchQuery,
      {},
      limit,
      page + 1,
    );

    return {
      total,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage,
      problems,
    };
  }
}
