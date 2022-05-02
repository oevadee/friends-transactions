import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMany() {
    return this.userService.findMany();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Patch(':id')
  edit(@Param('id', ParseIntPipe) userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
