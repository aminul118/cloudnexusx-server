import express from 'express';
import { PortfolioController } from './Portfolio.controller';
import { multerUpload } from '../../config/multer.config';

import { makeSlug } from '../../middlewares/makeSlug';

const router = express.Router();

router.post(
  '/create-portfolio',
  multerUpload.single('image'),
  makeSlug(['title']),
  PortfolioController.createPortfolio,
);
router.get('/', PortfolioController.getAllPortfolios);
// Standardized slug-based retrieval
router.get('/:slug', PortfolioController.getPortfolioBySlug);
router.patch(
  '/:slug',
  multerUpload.single('image'),
  makeSlug(['title']),
  PortfolioController.updatePortfolioBySlug,
);
router.delete('/:slug', PortfolioController.deletePortfolioBySlug);

export const PortfolioRoutes = router;
