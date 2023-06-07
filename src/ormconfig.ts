/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AdminUser = require('nestjs-admin').AdminUserEntity

import { ConnectionOptions } from 'typeorm';


const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'egate',
  password: 'root',
  database: 'egate',
  entities: [__dirname + '/**/*.entity{.ts,.js}', 'node_modules/nestjs-admin/dist/src/adminUser/adminUser.entity.js'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  
};

export default config;
