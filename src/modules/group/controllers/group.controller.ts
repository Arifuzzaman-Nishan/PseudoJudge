import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GroupService } from '../services/group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  create(@Body() dto: any) {
    return this.groupService.createGroup(dto);
  }

  @Get('findAll')
  findAll() {
    return this.groupService.findAllGroups();
  }

  @Get('findAll-with-problems')
  findAllWithProblems() {
    return this.groupService.findAllGroupsWithProblems();
  }

  @Post('user-join')
  userJoin(@Body() dto: any) {
    return this.groupService.userJoinGroup(dto);
  }

  @Post('users-added')
  usersAdded(@Body() dto: any) {
    return this.groupService.usersAddedIntoGroup(dto);
  }

  @Delete('user-removed')
  userRemoved(@Body() dto: any) {
    return this.groupService.userRemovedFromGroup(dto);
  }

  @Post('add-problems')
  addProblems(@Body() dto: any) {
    return this.groupService.problemsAddedIntoGroup(dto);
  }

  @Delete('removed-problem')
  removedProblem(@Body() dto: any) {
    return this.groupService.problemRemovedFromGroup(dto);
  }
}
