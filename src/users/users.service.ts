import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll(option: FindManyOptions<User> = {}) {
    return this.usersRepository.find(option);
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository
      .findOne({ where: { id } })
      .then((user) => this.usersRepository.remove(user));
  }
}
