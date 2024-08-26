import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor() // private readonly userRepository: Repository<UserEntity>, // @InjectRepository(UserEntity)
  {}

  async getAll() {
    // return this.userRepository.find();
  }
}
