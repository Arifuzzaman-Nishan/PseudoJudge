import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProblemCrawler } from '../../crawler/services/problem.crawler';
import { ProblemRepository } from '../repository/problem.repository';
import { ProblemDetailsRepository } from '../repository/problem-details.repository';
import { TestCaseCrawler } from '../../crawler/services/testcase.crawler';
import { paginateCalculate } from 'src/shared/utils/paginate.utils';
import mongoose from 'mongoose';

enum OjName {
  LIGHT_OJ = 'LightOJ',
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

    // const { testInput, testOutput } = await this.testCaseCrawler.crawlTestCase({
    //   ojName: dto?.ojName,
    //   ojProblemId: problemResult?.ojProblemId,
    // });

    // problemResult = {
    //   ...problemResult,
    //   problemDetails: {
    //     ...problemResult.problemDetails,
    //     testDataset: {
    //       testInput,
    //       testOutput,
    //     },
    //   },
    // };

    const { title, ojProblemId, problemDetails } = problemResult;

    const findProblem = await this.problemRepository.findOneByField({
      ojProblemId: ojProblemId,
    });

    if (!findProblem) {
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

  async findOneProblemWithDetails(problemId: string) {
    console.log('problemId is ', problemId);

    const [data] = await this.problemRepository.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(problemId), // convert to ObjectId if `problemId` is a string
        },
      },
      {
        $lookup: {
          from: 'problemdetails',
          localField: 'problemDetails',
          foreignField: '_id',
          as: 'problemDetails',
        },
      },
      {
        $unwind: '$problemDetails', // Deconstructs problemDetails to not be an array
      },
      {
        $project: {
          'problemDetails.testDataset': 0, // Exclude testDataset field
        },
      },
    ]);

    console.log('data is ', data);

    return data;
  }

  async deleteOneProblem(id: string) {
    return this.problemRepository.delete({ _id: id });
  }

  async paginateFilter(page: number, limit: number, query: string) {
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

    const pagination = paginateCalculate(total, page, limit);

    const problems = await this.problemRepository.aggregate([
      {
        $match: searchQuery,
      },
      {
        $skip: pagination.skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          groups: 0,
          __v: 0,
        },
      },
    ]);

    delete pagination.skip;

    return {
      pagination: {
        total,
      },
      problems,
    };
  }
}
