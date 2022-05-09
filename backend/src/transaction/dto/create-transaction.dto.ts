import { Injectable } from '@nestjs/common';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

@Injectable()
export class CreateTransactionDto {
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  receiverId: string;

  @IsUUID()
  @IsNotEmpty()
  senderId: string;
}
