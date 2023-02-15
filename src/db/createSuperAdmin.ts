import bcrypt from 'bcryptjs';
import {prisma} from './prisma';
import config from '../config';
import {logger} from '../utils/logger';

export const createSuperAdmin = async () => {
  try {
    const findAdmin = await prisma.users.findFirst({
      where: {
        OR: [
          {email: config.server.SUPER_ADMIN_EMAIL},
          {role: config.server.SUPER_ADMIN_ROLE},
        ],
      },
    });
    if (findAdmin) {
      logger.info('super admin already exists');

      return;
    }

    const hashedPassword = await bcrypt.hash(
      config.server.SUPER_ADMIN_PASSWORD,
      10,
    );

    const createAdmin = await prisma.admin.create({
      data: {
        firstname: config.server.SUPER_ADMIN_FIRSTNAME,
        lastname: config.server.SUPER_ADMIN_LASTNAME,
        email: config.server.SUPER_ADMIN_EMAIL,
        role: 'Super_Admin',
      },
    });
    await prisma.users.create({
      data: {
        firstname: config.server.SUPER_ADMIN_FIRSTNAME,
        lastname: config.server.SUPER_ADMIN_LASTNAME,
        email: config.server.SUPER_ADMIN_EMAIL,
        role: 'Super_Admin',
        password: hashedPassword,
        adminId: createAdmin.adminId,
      },
    });
    logger.info('super admin created on startup');
  } catch (error) {
    logger.info(error);

    throw new Error(JSON.stringify(error));
  }
};
