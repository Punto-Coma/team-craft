import { Router } from 'express';
import { GroupService } from '../../infrastructure/services';
import { PrismaGroupRepository } from '../../infrastructure/repositories/prisma';

import { GroupController } from '../controllers/group.controller';
import { requireAuth } from '../middlewares';

export class GroupRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new GroupService(new PrismaGroupRepository());
    const controller = new GroupController(service);

    router.post('/', requireAuth, controller.CreateGroup.bind(controller));
    router.post('/add/:groupId', requireAuth, controller.AddMember.bind(controller));

    router.get('/', requireAuth, controller.GetGroups.bind(controller));

    return router;
  }
}
