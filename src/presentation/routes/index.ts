import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { currentUser } from '../middlewares/current-user.middleware';
import { ProjectRoutes } from './project.routes';
import { UserRoutes } from './user.routes';
import { GroupRoutes } from './group.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/auth', AuthRoutes.routes);

    router.use(currentUser);

    router.use('/users', UserRoutes.routes);
    router.use('/project', ProjectRoutes.routes);
    router.use('/groups', GroupRoutes.routes);

    return router;
  }
}
