import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from 'libs/encrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('EncryptService')
    private encryptSerivce: EncryptService,
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

  getJWT(id: string) {
    return this.encryptSerivce.getJWT({ id });
  }

  verifyJWT(token: string) {
    return this.encryptSerivce.verifyJWT(token);
  }
}
