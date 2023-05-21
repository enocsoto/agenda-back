import * as path from 'path';
import { DataSource } from 'typeorm';
import { config as envconf } from 'dotenv';
envconf();

import { readdirSync } from 'fs';

const config = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.resolve(`${__dirname}/../../**/**.entity{.ts,.js}`)],
  migrations: readdirSync(path.join(__dirname, '../migration')).map(
    (item) => `${path.join(__dirname, `../migration/${item}`)}`,
  ),
  migrationsTableName: 'migrations',
  logging: false,
  synchronize: false,
});

export default config;
