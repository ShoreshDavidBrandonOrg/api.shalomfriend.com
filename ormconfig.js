const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

const PG_HOST = 'localhost';
const PG_PORT = '5432';
const PG_USERNAME = '';
const PG_PASSWORD = '';
const PG_DATABASE = 'sdb';

module.exports = {
  type: 'postgres',
  host: PG_HOST,
  port: PG_PORT,
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['build/entity/**/*.js'],
  migrations: ['build/migration/**/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: false,
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
  },
};
