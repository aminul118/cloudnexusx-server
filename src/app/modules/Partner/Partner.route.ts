import { Router } from 'express';
import { PartnerController } from './Partner.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PartnerValidation } from './Partner.validation';
import { multerUpload } from '../../config/multer.config';

const router = Router();

// Public routes
router.get('/', PartnerController.getAllPartners);
router.get('/slug/:slug', PartnerController.getPartnerBySlug);

// Admin/Super Admin protected routes
router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  multerUpload.single('image'),
  validateRequest(PartnerValidation.createPartnerValidationSchema),
  PartnerController.createPartner,
);

router.patch(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  multerUpload.single('image'),
  validateRequest(PartnerValidation.updatePartnerValidationSchema),
  PartnerController.updatePartner,
);

router.delete(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  PartnerController.deletePartner,
);

export const PartnerRoutes = router;
