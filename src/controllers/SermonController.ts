import { NextFunction, Request, Response } from 'express';

import { Sermon } from '../entity/Sermon';
import { slugify } from '../utils';

export const allSermons = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const sermons = await Sermon.find({ order: { createdAt: 'ASC' } });

    return res.status(200).json({
      success: true,
      data: sermons,
    });
  } catch (error) {
    next(error);
  }
};

export const singleSermonById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const sermon = await Sermon.findOne(id);

    return res.status(200).json({ success: true, data: { sermon } });
  } catch (error) {
    next(error);
  }
};

export const singleSermonBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { slug } = req.params;

    const sermon = await Sermon.findOne({ slug });

    return res.status(200).json({ success: true, data: { sermon } });
  } catch (error) {
    next(error);
  }
};

export const createSermon = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const {
      title,
      featuredImage,
      order,
      video,
      audio,
      parts,
      category,
      showTitle,
    }: Sermon = req.body;

    const sermon = Sermon.create({
      title,
      slug: slugify(title),
      featuredImage,
      order,
      video,
      audio,
      parts,
      category,
      showTitle,
    });

    await sermon.save();

    return res.status(200).json({
      success: true,
      data: sermon,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSermon = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const updatedSermon = await Sermon.update({ id }, { ...req.body });

    if (updatedSermon.generatedMaps.length < 0) {
      return res.status(200).json({
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteSermon = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    await Sermon.delete({ id });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
