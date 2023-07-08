import { Module, forwardRef } from '@nestjs/common';
import { CodeController } from './controllers/code.controller';
import { CodeService } from './services/code.service';
import { CompilerboxModule } from '../compilerbox/compilerbox.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Code, CodeSchema } from './schemas/code.schema';
import { CodeRepository } from './repository/code.repository';
import { UserModule } from '../user/user.module';
import { ProblemModule } from '../problem/problem.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Code.name, schema: CodeSchema }]),
    forwardRef(() => UserModule),
    ProblemModule,
    CompilerboxModule,
  ],
  controllers: [CodeController],
  providers: [CodeService, CodeRepository],
  exports: [CodeRepository],
})
export class CodeModule {}
