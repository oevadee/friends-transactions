import { Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';

@Injectable()
export class EditTransactionDto {
  @IsString()
  amount?: number;

  @IsString()
  description?: string;
}
