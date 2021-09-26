import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';

// tslint:disable-next-line
const Aweber = require('aweber-api');

config();

export const subscribeToEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const data = {
    email: req.body.email,
    name: req.body.name,
  };

  try {
    const aw = new Aweber(
      process.env.AWEBER_CONSUMER_KEY,
      process.env.AWEBER_SECRET_CONSUMER_KEY,
      {
        token: process.env.AWEBER_TOKEN,
        tokenSecret: process.env.AWEBER_TOKEN_SECRET,
      },
    );
    const response = await aw.post(process.env.AWEBER_ENDPOINT, { data });
    return res.status(200).json({ data: response });
  } catch (error) {
    next(error.error.message);
  }
};
