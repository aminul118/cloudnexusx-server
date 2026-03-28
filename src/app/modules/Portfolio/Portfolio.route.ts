import express from 'express';
import { PortfolioController } from './Portfolio.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.post(
  '/create-portfolio',
  multerUpload.single('image'),
  PortfolioController.createPortfolio,
);
router.get('/', PortfolioController.getAllPortfolios);
router.get('/:id', PortfolioController.getSinglePortfolio);
router.put(
  '/:id',
  multerUpload.single('image'),
  PortfolioController.updatePortfolio,
);
router.delete('/:id', PortfolioController.deletePortfolio);

export const PortfolioRoutes = router;
