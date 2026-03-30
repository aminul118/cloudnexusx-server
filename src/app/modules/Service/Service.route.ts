import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './Service.validation';
import { ServiceControllers } from './Service.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', ServiceControllers.getAllServices);

router.get('/:id', ServiceControllers.getSingleService);

router.get('/slug/:slug', ServiceControllers.getSingleServiceBySlug);

router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService,
);

router.patch(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  ServiceControllers.updateService,
);

router.delete(
  '/:id',
  auth('ADMIN', 'SUPER_ADMIN'),
  ServiceControllers.deleteService,
);

export const ServiceRoutes = router;
