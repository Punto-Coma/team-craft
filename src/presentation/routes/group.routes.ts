import { Router } from 'express';
import { GroupService } from '../../infrastructure/services';
import { PrismaGroupRepository } from '../../infrastructure/repositories/prisma';
import { GroupController } from '../controllers/group.controller';
import { requireAuth, validateInputData } from '../middlewares';
import { groupSchema, addMemberGroupSchema } from '../../domain/validators';

export class GroupRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new GroupService(new PrismaGroupRepository());
    const controller = new GroupController(service);

    router.post(
      '/', 
      [requireAuth, validateInputData(groupSchema)],
      controller.CreateGroup.bind(controller));

    router.post(
      '/add/:groupId',
      [requireAuth, validateInputData(addMemberGroupSchema)], 
      controller.AddMember.bind(controller));

    router.get('/', requireAuth, controller.GetGroups.bind(controller));
    router.get('/:groupId', requireAuth, controller.GetGroup.bind(controller));

    return router;
  }
}

/**
 * @swagger
 * /api/v1/groups:
 *   get:
 *     summary: Returns a list of groups
 *     security:
 *         - bearerAuth: []
 *     tags:
 *         - Groups
 *     responses:
 *       200:
 *         description: Returns a list of groups.
 *       404:
 *         description: There are no groups.
 *       500:
 *         description: Internal server error.
 * 
 *   post:
 *     summary: Create a group
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Groups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *               name:
 *                 type: string
 *               projectEnds:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Group successfully created.
 *       400:
 *         description: This group cannot be created.
 *       500:
 *         description: Internal server error.
 * 
 * /api/v1/groups/{id}:
 *   get:
 *     summary: Return a group by id.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Groups
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group id
 *         default: cltfxiu9t0000gjt8q5r7rdjd
 *     responses:
 *       200:
 *         description: Return a group.
 *       403:
 *         description: The user doesn't belong to this group.
 *       404:
 *         description: There is no group whit this id.
 *       500:
 *         description: Internal server error.
 * 
 * /api/v1/groups/add/{groupId}:
 *   post:
 *     summary: Add a member to the group
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Groups
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group id
 *         default: cltfxiu9t0000gjt8q5r7rdjd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully added.
 *       400:
 *         description: This user cannot be added.
 *       404:
 *         description: User or Group doesn't exist.
 *       500:
 *         description: Internal server error.
 */
