import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  private users: { uid: number; name: string }[] = [];
  async findMany() {
    return this.users;
  }

  async findOne(id: number) {
    return this.users.find((user) => user.uid === id);
  }

  async createUser(body: CreateUserDto) {
    const newUser = {
      uid: this.users.length + 1,
      ...body,
    };
    this.users.push(newUser);
    return newUser;
  }

  async editUser(id: number, body: EditUserDto) {
    let currentUser = {
      name: '',
      uid: null,
    };
    this.users.forEach((user) => {
      if (user.uid === id) {
        user.name = body.name;
        currentUser = user;
      }
    });
    return currentUser;
  }

  async deleteUser(id: number) {
    const deletedUser = this.users.find(({ uid }) => uid === id);
    this.users.filter(({ uid }) => uid === deletedUser.uid);
    return `User ${deletedUser.name} was successfully deleted`;
  }
}
