import { Router } from 'express';
import { ProjectService } from '../../infrastructure/services';
import { PrismaProjectRepository } from '../../infrastructure/repositories/prisma';
import { ProjectController } from '../controllers/project.controller';
import { requireAuth, validateInputData } from '../middlewares';
import { projectSchema } from '../../domain/validators';

export class GroupRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ProjectService(new PrismaProjectRepository());
    const controller = new ProjectController(service);

    return router;
  }
}
