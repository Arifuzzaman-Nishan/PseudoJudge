import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GroupService } from '../services/group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  create(@Body() dto: any) {
    console.log('group dto is ', dto);
    return this.groupService.createGroup(dto);
  }

  @Get('findAll')
  findAll() {
    return this.groupService.findAllGroups();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOneGroup(id);
  }

  @Get('findAll-with-problems')
  findAllWithProblems() {
    return this.groupService.findAllGroupsWithProblems();
  }

  @Post('usersAdded')
  usersAdded(@Body() dto: any) {
    return this.groupService.usersAddedIntoGroup(dto);
  }

  @Post('userEnroll')
  userJoin(@Body() dto: any) {
    return this.groupService.userJoinGroup(dto);
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
