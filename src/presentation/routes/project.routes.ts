import { Router } from 'express';
import { ProjectService } from '../../infrastructure/services';
import { PrismaProjectRepository } from '../../infrastructure/repositories/prisma';
import { ProjectController } from '../controllers/project.controller';
import { validateInputData } from '../middlewares/validate-joi.middleware';
import { createProjectSchema } from '../../domain/validators';
import { requireAuth } from '../middlewares/require-auth.middleware';

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

    return router;
  }
}
