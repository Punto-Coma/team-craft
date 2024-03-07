import { Router } from 'express';
import { UserService } from '../../infrastructure/services';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma';
import { requireAuth, verifyId, validateInputData } from '../middlewares';
import { createUserProfileSchema, getUsersSchema, updateUserSchema } from '../../domain/validators';
import { UserController } from '../controllers/user.controller';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new UserService(new PrismaUserRepository());
    const controller = new UserController(service);

    router.post(
      '/profile/:id',
      [requireAuth, verifyId, validateInputData(createUserProfileSchema)],
      controller.CreateProfile.bind(controller)
    );

    router.get(
      '/',
      [requireAuth, validateInputData(undefined, getUsersSchema)],
      controller.GetUsers.bind(controller)
    );

    router.get('/:id', requireAuth, controller.GetUser.bind(controller));

    router.put(
      '/:id',
      [requireAuth, verifyId, validateInputData(updateUserSchema)],
      controller.UpdateUser.bind(controller)
    );

    router.delete('/:id', [requireAuth, verifyId], controller.DeleteUser.bind(controller));

    return router;
  }
}

/**
 * @swagger
 * /api/v1/users:
 *    get:
 *        summary: Get all users
 *        security:
 *            - bearerAuth: []
 *        tags:
 *            - Users
 *        responses:
 *            200:
 *                description: List of users
 *            500:
 *                description: Internal server error
 * /api/v1/users/{id}:
 *    get:
 *        summary: Get all users
 *        security:
 *            - bearerAuth: []
 *        tags:
 *            - Users
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: User id
 *              schema:
 *                  type: string
 *        responses:
 *            200:
 *                description: List of users
 *            500:
 *                description: Internal server error
 */
