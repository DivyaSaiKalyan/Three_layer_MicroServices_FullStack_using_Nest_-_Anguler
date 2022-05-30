import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { typeormConfigOptions } from '../../config/orm.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
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
