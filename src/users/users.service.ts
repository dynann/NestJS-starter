import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    try {
      const users = await this.findAll();
      users.map((user) => {
        if (user.email === createUserDto.email) {
          throw new HttpException(
            'this user already exists',
            HttpStatus.CONFLICT,
          );
        }
      });
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new Error(err);
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException('no user found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new Error(err);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const res = await this.userRepository.find();
      if (!res) {
        throw new HttpException(' data base is empty ', HttpStatus.NOT_FOUND);
      }
      return res;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException(
          'this user does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.userRepository.update(id, updateUserDto);
      return {
        message: 'update user successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new Error(err);
    }
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
