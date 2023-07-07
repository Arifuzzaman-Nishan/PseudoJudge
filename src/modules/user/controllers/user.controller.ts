import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('create')
  // create(@Body() dto: any) {
  //   return this.userService.createUser(dto);
  // }

  @Get('findAll')
  findAll(@Query() query: { group: string; groupId: string }) {
    // console.log('query is ', query);
    return this.userService.findAllUser(query);
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.deleteOneUser(id);
  }
}
