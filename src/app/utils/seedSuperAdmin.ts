import logger from './logger';
import envVars from '../config/env';

import { User } from '../modules/User/User.model';

/**
 * Seeds a super admin user into the database based on environment variables.
 * This ensures at least one master account exists on server start.
 */
const seedSuperAdmin = async () => {
  try {
    const { NAME, EMAIL, PASSWORD } = envVars.SUPER_ADMIN;

    if (!EMAIL || !PASSWORD) {
      logger.warn(
        '⚠️  Super Admin credentials not fully configured in environment variables. Skipping seed.',
      );

      return;
    }

    const isSuperAdminExist = await User.findOne({ email: EMAIL }).select(
      '+password',
    );

    if (isSuperAdminExist) {
      const isPasswordMatched = await User.isPasswordMatched(
        PASSWORD,
        isSuperAdminExist.password,
      );

      if (!isPasswordMatched) {
        logger.log(
          'ℹ️  Super admin exists but password does not match. Updating password...',
        );
        isSuperAdminExist.password = PASSWORD;
        await isSuperAdminExist.save();
        logger.log('✅ Super Admin password updated successfully');
      } else {
        logger.log('ℹ️  Super admin already exists and password matches');
      }

      return;
    }

    logger.log('🚀 Initiating Super Admin seeding...');

    const payload = {
      name: NAME || 'Super Admin',
      email: EMAIL,
      password: PASSWORD,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      isVerified: true,
      isDeleted: false,
    };

    const superAdmin = await User.create(payload);
    logger.log('✅ Super Admin created successfully:', superAdmin.email);
  } catch (error) {
    logger.error('❌ Error seeding Super Admin:', error);
  }
};

export default seedSuperAdmin;
