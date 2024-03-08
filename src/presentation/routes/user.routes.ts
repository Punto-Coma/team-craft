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
 *        summary: Returns a list of registered users
 *        security:
 *            - bearerAuth: []
 *        tags:
 *            - Users
 *        parameters:
 *            - in: query
 *              name: limit
 *              schema:
 *              type: integer
 *              description: Number of users to return per page
 *              default: 10
 *            - in: query
 *              name: page
 *              schema:
 *                type: integer
 *              description: Page number of results to return
 *              default: 1
 *        responses:
 *            200:
 *                description: Returns a list of users.
 *            404:
 *                description: There are no users.
 *            500:
 *                description: Could not retrieve users. Please try again.
 * /api/v1/users/{id}:
 *   get:
 *     summary: Returns a single user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *         default: cltfxiu9t0000gjt8q5r7rdjd
 *     responses:
 *       200:
 *         description: Returns a user based on the specified id.
 *       404:
 *         description: There is no user with this id.
 *       500:
 *         description: Could not retrieve user. Please try again.
 *
 *   put:
 *     summary: Update an user by id
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *         default: cltfxiu9t0000gjt8q5r7rdjd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the updated user data.
 *       404:
 *         description: Couldnt update this user, please try again.
 *       500:
 *         description: Couldnt update user, please try again.
 *
 *   delete:
 *     summary: Delete an user by id
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *         default: cltfxiu9t0000gjt8q5r7rdjd
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: There is no user whit this id.
 *       500:
 *         description: Couldnt delete this user, please try again.
 */
