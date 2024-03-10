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

/**
 * @swagger
 * /api/v1/project:
 *    get:
 *        summary: Returns a list of projects
 *        security:
 *            - bearerAuth: []
 *        tags:
 *            - Projects
 *        responses:
 *            200:
 *                description: Returns a list of projects.
 *            404:
 *                description: There are no projects.
 *            500:
 *                description: Internal server error.
 * /api/v1/project/{id}:
 *   post:
 *     summary: Create a project
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *         default: cltfxiu9t0000gjt8q5r7rdjd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               challenge:
 *                 type: string
 *                 enum: [EASY, MEDIUM, HARD]
 *               imageUrl:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Project successfully created.
 *       400:
 *         description: This project cannot be created.
 *       500:
 *         description: Internal server error.
 * 
 *   get:
 *     summary: Return a project by id.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *         default: cltfxiu9t0000gjt8q5r7rdjd
 *     responses:
 *       200:
 *         description: Return a project.
 *       404:
 *         description: There is no project whit this id.
 *       500:
 *         description: Internal server error.
 *
 *   put:
 *     summary: Update project
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *         default: cltfxiu9t0000gjt8q5r7rdjd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               challenge:
 *                 type: string
 *                 enum: [EASY, MEDIUM, HARD]
 *               imageUrl:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Project successfully updated.
 *       400:
 *         description: This project cannot be updated.
 *       404:
 *         description: There is no project whit this id.
 *       500:
 *         description: Internal server error.
 * 
 *   delete:
 *     summary: Delete a project by id
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *         default: cltfxiu9t0000gjt8q5r7rdjd
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: There is no project whit this id.
 *       500:
 *         description: Couldnt delete this project, please try again.
 * 
 */
