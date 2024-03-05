import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptModule } from 'libs/encrypt/encrypt.module';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncryptModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
