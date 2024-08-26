import { DataSourceOptions } from 'typeorm';

export type TConfiguration = {
  app: { port: number };
  postgres: DataSourceOptions;
  bot: { token: string };
};
