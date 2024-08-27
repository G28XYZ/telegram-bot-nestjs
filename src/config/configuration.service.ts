import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { TConfiguration } from 'src/types';
import { DataSource, DataSourceOptions } from 'typeorm';

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

  static get dataSource(): DataSourceOptions {
    return ConfigurationService.configuration.postgres;
  }

  static get configuration() {
    return <TConfiguration>yaml.load(readFileSync(configPath, 'utf8'));
  }

  static get ormconfig() {
    return registerAs('database', () => ({
      ...ConfigurationService.configuration.postgres,
      entities: [join(__dirname, './../**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, './../migration', '**', '*.{ts,js}')],
    }));
  }
}

export default () => ConfigurationService.configuration;
export const connectionSource = new DataSource(ConfigurationService.dataSource);
