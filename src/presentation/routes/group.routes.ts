import { Router } from 'express';
import { GroupService } from '../../infrastructure/services';
import { PrismaGroupRepository } from '../../infrastructure/repositories/prisma';

import { GroupController } from '../controllers/group.controller';

export class GroupRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new GroupService(new PrismaGroupRepository());
    const controller = new GroupController(service);

    router.post('/', controller.CreateGroup.bind(controller));

    return router;
  }
}
