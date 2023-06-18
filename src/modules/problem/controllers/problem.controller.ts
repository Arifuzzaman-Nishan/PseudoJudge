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
  findWithPaginate(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.problemService.paginate(page, limit);
  }

  @Post('crawl')
  extract(@Body() dto: any) {
    return this.problemService.extractProblem(dto);
  }

  @Get('findAll')
  findAll() {
    return this.problemService.findAllProblems();
  }

  @Get('findOneWithDetails')
  findOneWithProblemDetails(
    @Query('ojName') ojName: string,
    @Query('problemId') ojProblemId: string,
  ) {
    return this.problemService.findOneProblemWithDetails(ojName, ojProblemId);
  }

  @Delete('deleteOne/:id')
  deleteOne(@Param('id') id: string) {
    return this.problemService.deleteOneProblem(id);
  }
}
