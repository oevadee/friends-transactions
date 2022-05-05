import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findMany() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(dto: CreateUserDto) {
    const defaultHash = await argon.hash('test123');
    const { hash, ...user } = await this.prisma.user.create({
      data: { hash: defaultHash, ...dto },
    });
    return user;
  }

  async editUser(id: string, body: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
    });
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return `User ${user.firstName} ${user.lastName} was successfully deleted`;
  }
}
