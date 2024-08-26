import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {
  Telegraf,
  Context as ContextTelegraf,
  NarrowedContext,
} from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';

export interface Context extends NarrowedContext<ContextTelegraf, any> {
  match: RegExpMatchArray;
}

@Controller('user')
export class UserController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
  ) {}

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAll();
  }
}
