import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { TConfiguration } from 'src/types';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configPath = join(__dirname, '../../config.yaml');
// const configPath = process.env.CONFIG_FILE_PATH;

@Injectable()
export class ConfigurationService<T extends TConfiguration = TConfiguration> extends ConfigService<T> {
  private readonly _config: T;

  constructor(internalConfig: T) {
    super(internalConfig);
    this._config = internalConfig;
    console.log('create config');
  }

  get config() {
    return this._config;
  }

  get ormconfig() {
    return ConfigurationService.getOrmConfig();
  }

  static yamlConfig() {
    return yaml.load(readFileSync(configPath, 'utf8')) as TConfiguration;
  }

  static getOrmConfig() {
    return registerAs(
      'database',
      (): TypeOrmModuleOptions => ({
        ...ConfigurationService.yamlConfig().postgres,
        // entities: [],
        migrations: [join(__dirname, '/migration/**/*.{ts,js}')],
      }),
    );
  }
}

export default () => {
  return <TConfiguration>ConfigurationService.yamlConfig();
  //  <TConfiguration>yaml.load(readFileSync(process.env.CONFIG_FILE_PATH, 'utf8'));
};
