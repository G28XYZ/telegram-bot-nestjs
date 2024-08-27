import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule, TelegrafModuleOptions } from 'nestjs-telegraf';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration, { ConfigurationService } from './config/configuration.service';
import { ConfigurationModule } from './config/configuration.module';

const telegrafFactory = {
  async useFactory(): Promise<TelegrafModuleOptions> {
    return {
      token: configuration().bot.token,
    };
  },
};

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ConfigurationModule,
    forwardRef(() => TelegrafModule.forRootAsync(telegrafFactory)),
    TypeOrmModule.forRootAsync({ useFactory: ConfigurationService.getOrmConfig() }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
