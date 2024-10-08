import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserBot } from './user.bot';
import { ConfigurationModule } from 'src/config/configuration.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigurationModule],
  controllers: [UserController],
  providers: [UserService, UserBot],
  exports: [UserService, UserBot],
})
export class UserModule {}
