import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './Service.validation';
import { ServiceControllers } from './Service.controller';
import auth from '../../middlewares/auth';
import { multerUpload } from '../../config/multer.config';
import { makeSlug } from '../../middlewares/makeSlug';

const router = express.Router();

router.get('/', ServiceControllers.getAllServices);


router.get('/slug/:slug', ServiceControllers.getSingleServiceBySlug);

router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  multerUpload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]),
  makeSlug(['title']),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService,
);


router.patch(
  '/slug/:slug',
  auth('ADMIN', 'SUPER_ADMIN'),
  multerUpload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]),
  makeSlug(['title']),
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  ServiceControllers.updateServiceBySlug,
);

router.delete(
  '/slug/:slug',
  auth('ADMIN', 'SUPER_ADMIN'),
  ServiceControllers.deleteServiceBySlug,
);

export const ServiceRoutes = router;
