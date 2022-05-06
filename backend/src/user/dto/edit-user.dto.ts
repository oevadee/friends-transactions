import { Injectable } from '@nestjs/common';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@Injectable()
export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;
}
