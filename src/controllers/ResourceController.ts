import { NextFunction, Request, Response } from 'express';

import { Resource } from '../entity/Resource';
import { slugify } from '../utils';

export const allResources = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const resources = await Resource.find();

    return res.status(200).json({
      success: true,
      data: resources,
    });
  } catch (error) {
    next(error);
  }
};

export const singleResourceBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { slug } = req.params;

    const resource = await Resource.findOne({ slug });

    return res.status(200).json({ success: true, data: { resource } });
  } catch (error) {
    next(error);
  }
};

export const singleResourceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const resource = await Resource.findOne({ id });

    return res.status(200).json({ success: true, data: { resource } });
  } catch (error) {
    next(error);
  }
};

export const createResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const {
      title,
      featuredImage,
      order,
      category,
      color,
      video,
      audio,
      parts,
      content,
      showTitle,
    }: Partial<Resource> = req.body;

    const resource = Resource.create({
      title,
      slug: slugify(title),
      featuredImage,
      order,
      category,
      color,
      video,
      audio,
      parts,
      content,
      showTitle,
    });

    await resource.save();

    return res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    next(error);
  }
};

export const updateResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const updatedResource = await Resource.update({ id }, { ...req.body });

    if (updatedResource.generatedMaps.length < 0) {
      return res.status(200).json({
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResource = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    await Resource.delete({ id });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
