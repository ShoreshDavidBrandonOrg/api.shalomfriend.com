const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
  type: 'postgres',
  url: process.env.PG_URL,
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
