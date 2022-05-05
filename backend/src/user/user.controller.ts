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
  findOne(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  edit(@Param('id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Delete(':id')
  delete(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
