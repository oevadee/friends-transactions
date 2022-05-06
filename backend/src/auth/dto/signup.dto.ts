import { Injectable } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

@Injectable()
export class SignupDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
