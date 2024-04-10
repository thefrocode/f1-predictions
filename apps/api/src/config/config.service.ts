import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (value == undefined && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value as string;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    if (this.isProduction()) {
      return {
        type: 'mysql',
        host: this.getValue('MYSQL_HOST'),
        port: parseInt(this.getValue('MYSQL_PORT')),
        username: this.getValue('MYSQL_USER'),
        password: this.getValue('MYSQL_PASSWORD'),
        database: this.getValue('MYSQL_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: true,
          },
        },
      };
    } else {
      return {
        type: 'mysql',
        host: this.getValue('MYSQL_HOST'),
        port: parseInt(this.getValue('MYSQL_PORT')),
        username: this.getValue('MYSQL_USER'),
        password: this.getValue('MYSQL_PASSWORD'),
        database: this.getValue('MYSQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: this.isProduction(),
      };
    }
  }
}
const configService = new ConfigService(process.env).ensureValues([
  'MYSQL_HOST',
  'MYSQL_PORT',
  'MYSQL_USER',
  'MYSQL_PASSWORD',
  'MYSQL_DATABASE',
]);

export { configService };
