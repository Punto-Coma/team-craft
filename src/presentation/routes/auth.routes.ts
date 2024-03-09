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

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 10
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 20
 *                 pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
 *     responses:
 *       201:
 *         description: User successfully created.
 *       400:
 *         description: This user cannot be created.
 *       500:
 *         description: Internal server error.
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 20
 *     responses:
 *       201:
 *         description: User token.
 *       404:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
