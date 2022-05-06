import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: SignupDto) {
    const { username, email, password } = dto;
    const hash = await argon.hash(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          username,
          email,
          hash,
        },
      });
      return this.signToken(user.id, user.username);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P20002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw err;
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const isVerified = await argon.verify(
      user.hash,
      dto.password
    );
    if (!isVerified) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return this.signToken(user.id, user.username);
  }

  async signToken(
    userId: string,
    username: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
    };
    const secret = this.config.get('JWT_SECRET');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '90m',
      secret,
    });

    return {
      access_token,
    };
  }
}
