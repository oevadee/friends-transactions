import { Injectable } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

@Injectable()
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
