import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../entity/User';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      issuer: 'https://api.shoreshdavidbrandon.org',
      expiresIn: '1h',
    });

    return res.status(200).json({
      success: true,
      data: {
        // Return the User object and omit the `password` field.
        user: { ...user, password: null },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
