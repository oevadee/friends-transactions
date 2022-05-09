import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { EditTransactionDto } from './dto/edit-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    const transactions =
      await this.prisma.transaction.findMany();
    return transactions;
  }

  async findOne(id: string) {
    const transation =
      await this.prisma.transaction.findUnique({
        where: {
          id,
        },
      });
    return transation;
  }

  async create(data: CreateTransactionDto) {
    const transaction =
      await this.prisma.transaction.create({
        data,
      });
    return transaction;
  }

  async edit(data: EditTransactionDto, id: string) {
    const transaction =
      await this.prisma.transaction.update({
        where: {
          id,
        },
        data,
      });
    return transaction;
  }

  async delete(transactionId: string) {
    await this.prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
    return `Transaction ${transactionId} was successfully deleted`;
  }
}
