import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { error } from 'console';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 0,
      username: "User1",
      email: "user1@email.com",
    },
    {
      id: 1,
      username: "User2",
      email: "user2@email.com"
    },
  ];

  create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
        ...createUserDto,
        id: Date.now(),
       };
  
      this.users.map((user) => {
        if (user.email === createUserDto.email) {
          // throw new Error('email is already exist');
          return 'email exist'
        }
      });
      this.users.push(newUser);
      return `${JSON.stringify(newUser)} is added to database`;
    } catch (error) {
      throw error;
    }
     
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('no user was found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user
    });
    const user = this.findOne(id)
    return user
  }

  remove(id: number) {
    const removeNinja = this.findOne(id)
    this.users = this.users.filter((user) => user.id !== id)
    return removeNinja
  }
}
