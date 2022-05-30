import { OrmTypes } from './../common/interfaces/typeorm.types';

//typeorm with mysql
// export const typeormConfigOptions: OrmTypes = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'micro_db_pro',
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   synchronize: true,
// };

//typeorm with postgres
export const typeormConfigOptions: OrmTypes = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'micro_db_pro_comments',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
