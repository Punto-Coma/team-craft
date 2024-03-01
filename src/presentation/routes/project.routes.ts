import { Router } from 'express';
import { ProjectService } from '../../infrastructure/services';
import { PrismaProjectRepository } from '../../infrastructure/repositories/prisma';
import { ProjectController } from '../controllers/project.controller';
import { requireAuth, validateInputData } from '../middlewares';
import { projectSchema } from '../../domain/validators';

export class ProjectRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ProjectService(new PrismaProjectRepository());
    const controller = new ProjectController(service);

    router.post(
      '/:id',
      [requireAuth, validateInputData(projectSchema)],
      controller.CreateProject.bind(controller)
    );

    router.get('/', requireAuth, controller.GetProjects.bind(controller));
    router.get('/:projectId', requireAuth, controller.GetProject.bind(controller));

    router.put(
      '/:projectId',
      [requireAuth, validateInputData(projectSchema)],
      controller.UpdateProject.bind(controller)
    );

    router.delete('/:projectId', requireAuth, controller.DeleteProject.bind(controller));

    return router;
  }
}
