import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProblemService } from '../services/problem.service';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  findWithPaginateFilter(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('query') query: string,
  ) {
    return this.problemService.paginateFilter(page, limit, query);
  }

  @Post('crawl')
  extract(@Body() dto: any) {
    return this.problemService.extractProblem(dto);
  }

  @Get('findAll')
  findAll() {
    return this.problemService.findAllProblems();
  }

  @Get('findOneWithDetails/:problemId')
  findOneWithProblemDetails(@Param('problemId') problemId: string) {
    return this.problemService.findOneProblemWithDetails(problemId);
  }

  @Delete('deleteOne/:id')
  deleteOne(@Param('id') id: string) {
    return this.problemService.deleteOneProblem(id);
  }
}
