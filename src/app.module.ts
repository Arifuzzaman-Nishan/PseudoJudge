import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { GroupModule } from './modules/group/group.module';
import { ProblemModule } from './modules/problem/problem.module';
import { CodeModule } from './modules/code/code.module';
import { AuthModule } from './modules/auth/auth.module';

console.log('env is ', process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    GroupModule,
    ProblemModule,
    CodeModule,
    AuthModule,
  ],
})
export class AppModule {}
