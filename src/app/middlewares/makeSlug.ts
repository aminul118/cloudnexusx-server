import { Request, Response, NextFunction } from 'express';
import { generateSlug } from '../utils/slugify';

/**
 * Middleware to translate 'title' or 'name' from req.body into a 'slug'.
 * This prefix is applied before controllers to ensure slugs are available even if the client doesn't send them.
 */
export const makeSlug = (fields: string[] = ['title', 'name']) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // If slug is already provided and not empty, don't override it
    if (req.body?.slug) {
      return next();
    }

    // Attempt to find a source field to generate a slug from
    for (const field of fields) {
      if (req.body?.[field]) {
        req.body.slug = generateSlug(req.body[field]);
        break;
      }
    }

    next();
  };
};
