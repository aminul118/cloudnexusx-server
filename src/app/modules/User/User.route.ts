import { Router } from 'express';
import { UserController } from './User.controller';
import auth from '../../middlewares/auth';
import { cacheMiddleware } from '@middleware/cacheMiddleware';

const router = Router();

router.post('/create-user', UserController.createUser);

router.get('/me', auth('ADMIN', 'USER', 'SUPER_ADMIN'), UserController.getMe);

router.get(
  '/statistics',
  auth('ADMIN', 'SUPER_ADMIN'),
  cacheMiddleware('users', 0, { onlyDefault: true }),
  UserController.getStatistics,
);

router.get(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  cacheMiddleware('users', 0, { onlyDefault: true }),
  UserController.getAllUsers,
);

router.patch(
  '/:id/status',
  auth('ADMIN', 'SUPER_ADMIN'),
  UserController.updateUserStatus,
);

router.patch(
  '/:id/role',
  auth('ADMIN', 'SUPER_ADMIN'),
  UserController.updateUserRole,
);

router.delete('/:id', auth('ADMIN', 'SUPER_ADMIN'), UserController.deleteUser);

router.patch(
  '/update-profile',
  auth('USER', 'ADMIN', 'SUPER_ADMIN'),
  UserController.updateProfile,
);

export const UserRoutes = router;
