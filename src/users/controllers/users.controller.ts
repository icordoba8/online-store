import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/pipes/mongo-id/mongo-id.pipe';

import { CreateUserDto, FilterUserDto, UpdateUserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { ParseIntPartialPipe } from '../../common/parse-int-partial/parse-int-partial.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  getAll(
    @Query(new ParseIntPartialPipe(['limit', 'offset'])) params: FilterUserDto,
  ) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
