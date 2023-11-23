import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
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

        autoLoadEntities: true,
        logging: true,
        ssl: {
          ca: this.getValue('CA_CERT'),
        },
      };
    } else {
      return {
        type: 'mysql',
        host: this.getValue('F1_MYSQL_HOST'),
        port: parseInt(this.getValue('F1_MYSQL_PORT')),
        username: this.getValue('F1_MYSQL_USER'),
        password: this.getValue('F1_MYSQL_PASSWORD'),
        database: this.getValue('F1_MYSQL_DATABASE'),
        autoLoadEntities: true,
        //synchronize: true,
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
