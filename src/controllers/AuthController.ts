import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../entity/User';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      throw new Error('Invalid password.');
    }

    return res.status(200).json({
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
        issuer: 'https://api.shoreshdavidbrandn.org',
      }),
      user: {
        firstName: user.firstName,
        id: user.id,
      },
      expiresIn: '24h',
    });
  } catch (error) {
    next(error);
  }
};

export const authRequest = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader: any = req.headers.authorization;

    if (!authHeader) {
      throw { status: 400, message: 'No Auth Header Provided' };
    }

    const token: any = authHeader.replace('Bearer ', '');
    if (!token) {
      throw { status: 400, message: 'Invalid Token' };
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw { status: 400, message: 'Not a valid user token' };
    }

    const expireAt = decoded.iat + 24 * 60 * 60; // 24 Hours;
    const currentTime = new Date().getSeconds();
    if (currentTime >= expireAt) {
      throw { status: 401, message: 'Access Token Expired' };
    }

    const user = await User.findOne({ id: decoded.userId });
    if (!user) {
      throw { status: 400, message: 'No Such User' };
    }

    next();
  } catch (error) {
    next(error);
  }
};
