import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable({})
export class AuthService {
  async signup(dto: AuthDto) {
    return { msg: 'User signed up' };
  }
  async signin(dto: AuthDto) {
    return { msg: 'User signed up' };
  }
}
