import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../infrastructure/services/auth.service';
import { PrismaAuthRepository } from '../infrastructure/repositories/prisma/auth.repository';

import { validateInputData } from './middlewares/validate-joi.middleware';
import { createUserSchema } from '../domain/schemas/create-user.schema';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const repository = new PrismaAuthRepository();
    const service = new AuthService(repository);
    const controller = new AuthController(service);

    router.post(
      '/signin',
      validateInputData(createUserSchema),
      controller.RegisterUser.bind(controller)
    );
    router.post('/login');

    return router;
  }
}
