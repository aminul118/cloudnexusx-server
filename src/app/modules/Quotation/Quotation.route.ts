import express from 'express';
import { QuotationController } from './Quotation.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  QuotationController.createQuotation,
);

router.get(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  QuotationController.getAllQuotations,
);

router.get(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  QuotationController.getQuotationById,
);

router.patch(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  QuotationController.updateQuotation,
);

router.delete(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  QuotationController.deleteQuotation,
);

export const QuotationRoutes = router;
