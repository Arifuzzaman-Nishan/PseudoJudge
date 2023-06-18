import { Body, Controller, Post } from '@nestjs/common';
import { CodeService } from '../services/code.service';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post('compile')
  runCode(@Body() dto: any) {
    return this.codeService.codeCompile(dto);
  }

  @Post('submit')
  submitCode(@Body() dto: any) {
    return this.codeService.codeSubmit(dto);
  }
}
