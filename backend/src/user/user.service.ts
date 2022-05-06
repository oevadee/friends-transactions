import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    const users = await this.prisma.user.findMany();
    return users.map(({ hash, ...user }) => user);
  }

  async findOne(id: string) {
    const { hash, ...user } =
      await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    return user;
  }

  async create(dto: CreateUserDto) {
    const defaultHash = await argon.hash('glaveyard123');
    const { hash, ...user } = await this.prisma.user.create(
      {
        data: { hash: defaultHash, ...dto },
      }
    );
    return user;
  }

  async edit(
    id: string,
    { password, ...dto }: EditUserDto
  ) {
    const newHash = await argon.hash(password);
    const { hash, ...user } = await this.prisma.user.update(
      {
        where: {
          id,
        },
        data: {
          ...dto,
          hash: newHash,
        },
      }
    );
    return user;
  }

  async delete(id: string) {
    const { username } = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return `User ${username} was successfully deleted`;
  }
}
