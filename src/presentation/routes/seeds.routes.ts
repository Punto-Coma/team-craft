import { Router } from 'express';
import {
  PrismaAuthRepository,
  PrismaGroupRepository,
  PrismaProjectRepository,
  PrismaUserRepository,
} from '../../infrastructure/repositories/prisma';
import { SeedsController } from '../controllers/seeds.controller';
import { SeedsService } from '../../infrastructure/services/seeds.service';

export class SeedsRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new SeedsService(
      new PrismaAuthRepository(),
      new PrismaUserRepository(),
      new PrismaProjectRepository(),
      new PrismaGroupRepository()
    );
    const controller = new SeedsController(service);

    router.get('/create-users', controller.CreateUsers.bind(controller));
    router.get('/create-projects', controller.CreateProjects.bind(controller));

    return router;
  }
}
