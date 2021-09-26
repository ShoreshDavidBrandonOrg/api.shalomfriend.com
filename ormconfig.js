const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

const PG_HOST = isProd ? process.env.PG_HOST : 'localhost';
const PG_PORT = isProd ? process.env.PG_PORT : '5432';
const PG_USERNAME = isProd ? process.env.PG_USERNAME : '';
const PG_PASSWORD = isProd ? process.env.PG_PASSWORD : '';
const PG_DATABASE = isProd ? process.env.PG_DATABASE : 'sdb';

module.exports = {
  type: 'postgres',
  url: process.env.PG_URL,
  // host: PG_HOST,
  // port: PG_PORT,
  // username: PG_USERNAME,
  // password: PG_PASSWORD,
  // database: PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['build/entity/**/*.js'],
  migrations: ['build/migration/**/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: false,
  ssl: {
    rejectUnauthorized: false,
  },
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
  },
};
