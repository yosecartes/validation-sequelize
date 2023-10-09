import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/* Project */
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get user',
  })
  @ApiOkResponse({
    description: 'ok!',
    type: UserDto,
  })
  @Get('')
  async find(@Query('id') id: number): Promise<UserDto> {
    const data = await this.usersService.findOneById(id);
    return data;
  }

  @Get('')
  async findOneByEmail(@Query('email') email: string): Promise<UserDto> {
    const data = await this.usersService.findOneByEmail(email);
    return data;
  }

  @Post('')
  async create(@Body() user: UserDto): Promise<UserDto> {
    const data = await this.usersService.create(user);
    return data;
  }
}
