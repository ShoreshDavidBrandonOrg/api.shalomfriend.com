import 'reflect-metadata';

// tslint:disable-next-line
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import { config } from 'dotenv';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import { createConnection } from 'typeorm';

import { router } from './router';

config();

const setupDatabase = async () => {
  await createConnection();
};

setupDatabase();

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(logger('dev'));
server.use(compression());
server.use(helmet());
server.use(cors());

server.use('/v2', router);

server.use((err: any, _req: any, res: any, _next: any) => {
  res.status(err.status || 500);

  res.send({ message: err.message });
});

server.listen(process.env.PORT || 3000);

console.log(`Server running successfully`);
