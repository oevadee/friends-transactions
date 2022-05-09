import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { EditTransactionDto } from './dto/edit-transaction.dto';
import { TransactionService } from './transaction.service';

@UseGuards(JwtGuard)
@Controller('transactions')
export class TransactionController {
  constructor(
    private transactionService: TransactionService
  ) {}

  @Get()
  findMany() {
    return this.transactionService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') transactionId: string) {
    return this.transactionService.findOne(transactionId);
  }

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.create(dto);
  }

  @Patch()
  edit(@Body() dto: EditTransactionDto, id: string) {
    return this.transactionService.edit(dto, id);
  }

  @Delete()
  delete(id: string) {
    return this.transactionService.delete(id);
  }
}
