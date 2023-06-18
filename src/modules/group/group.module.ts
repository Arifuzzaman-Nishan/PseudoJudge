import { Module } from '@nestjs/common';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './services/group.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema';
import { GroupEnrollmentKey } from './utils/group.enrollmentkey';
import { ProblemModule } from '../problem/problem.module';
import { GroupRepository } from './repository/group.repository';

@Module({
  imports: [
    UserModule,
    ProblemModule,
    MongooseModule.forFeature([
      {
        name: Group.name,
        schema: GroupSchema,
      },
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, GroupEnrollmentKey],
})
export class GroupModule {}
