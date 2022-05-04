import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { msg: 'User signed up' };
  }
  signin() {
    return { msg: 'User signed up' };
  }
}
