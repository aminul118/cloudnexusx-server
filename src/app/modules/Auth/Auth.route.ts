import { Router } from 'express';
import { AuthController } from './Auth.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/send-otp', AuthController.sendOTP);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/refresh-token', AuthController.refreshToken);

router.patch(
  '/change-password',
  auth('USER', 'ADMIN', 'SUPER_ADMIN'),
  AuthController.changePassword,
);

export const AuthRoutes = router;
