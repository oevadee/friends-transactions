import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Injectable()
export class AuthDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
