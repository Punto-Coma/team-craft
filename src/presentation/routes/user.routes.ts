import { Router } from 'express';
import { UserService } from '../../infrastructure/services';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma';
import { requireAuth, validateInputData } from '../middlewares';
import { updateUserSchema } from '../../domain/validators';
import { UserController } from '../controllers/user.controller';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new UserService(new PrismaUserRepository());
    const controller = new UserController(service);

    router.get('/', requireAuth, controller.GetUsers.bind(controller));
    router.get('/:id', requireAuth, controller.GetUser.bind(controller));

    router.put(
      '/:id',
      [requireAuth, validateInputData(updateUserSchema)],
      controller.UpdateUser.bind(controller)
    );

    router.delete('/:projectId', requireAuth, controller.DeleteUser.bind(controller));

    return router;
  }
}
