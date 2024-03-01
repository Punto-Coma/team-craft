import { Router } from 'express';
import { ProjectService } from '../../infrastructure/services';
import { PrismaProjectRepository } from '../../infrastructure/repositories/prisma';
import { ProjectController } from '../controllers/project.controller';
import { requireAuth, validateInputData } from '../middlewares';
import { createProjectSchema } from '../../domain/validators';

export class ProjectRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ProjectService(new PrismaProjectRepository());
    const controller = new ProjectController(service);

    router.post(
      '/:id',
      [requireAuth, validateInputData(createProjectSchema)],
      controller.CreateProject.bind(controller)
    );

    router.get('/', requireAuth, controller.GetProjects.bind(controller));
    router.get('/:projectId', requireAuth, controller.GetProject.bind(controller));

    router.put('/:projectId', requireAuth, controller.GetProject.bind(controller));

    router.delete('/:projectId', requireAuth, controller.GetProject.bind(controller));

    return router;
  }
}
