import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../../infrastructure/services';
import { validateInputData } from '../middlewares/validate-joi.middleware';
import { createUserSchema, loginUserSchema } from '../../domain/validators';
import {
  PrismaAuthRepository,
  PrismaUserRepository,
} from '../../infrastructure/repositories/prisma';

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
