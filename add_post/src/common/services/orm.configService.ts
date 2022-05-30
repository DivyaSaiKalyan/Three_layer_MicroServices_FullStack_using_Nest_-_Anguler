import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { typeormLoginConfigOptions } from '../../config/orm.config';
import { typeormConfigOptions } from '../../config/orm.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: typeormConfigOptions.host,
      port: typeormConfigOptions.port,
      username: typeormConfigOptions.username,
      password: typeormConfigOptions.password,
      database: typeormConfigOptions.database,
      entities: typeormConfigOptions.entities,
      synchronize: typeormConfigOptions.synchronize,
    };
  }
}

@Injectable()
export class TypeOrmConfigLoginService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: typeormLoginConfigOptions.host,
      port: typeormLoginConfigOptions.port,
      username: typeormLoginConfigOptions.username,
      password: typeormLoginConfigOptions.password,
      name: typeormLoginConfigOptions.name,
      database: typeormLoginConfigOptions.database,
      entities: typeormLoginConfigOptions.entities,
      synchronize: typeormLoginConfigOptions.synchronize,
    };
  }
}
