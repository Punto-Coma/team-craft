import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../infrastructure/services/auth.service';
import { PrismaAuthRepository } from '../infrastructure/repositories/prisma/auth.repository';

import { validateInputData } from './middlewares/validate-joi.middleware';
import { createUserSchema } from '../domain/validators/create-user.schema';
import { PrismaUserRepository } from '../infrastructure/repositories/prisma/user.repository';
import { loginUserSchema } from '../domain/validators';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new AuthService(new PrismaAuthRepository(), new PrismaUserRepository());
    const controller = new AuthController(service);

    router.post(
      '/signin',
      validateInputData(createUserSchema),
      controller.RegisterUser.bind(controller)
    );

    router.post(
      '/login',
      validateInputData(loginUserSchema),
      controller.LoginUser.bind(controller)
    );

    return router;
  }
}
