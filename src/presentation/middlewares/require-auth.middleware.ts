import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils';

const prisma = new PrismaClient();

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const id = req.currentUser?.id;

  try {
    if (!id) throw ErrorResponse(req, res, 401, 'Access denied, you need to log in to continue.');

    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists)
      throw ErrorResponse(req, res, 401, 'Access denied, you need to log in to continue.');

    if (req.currentUser?.id && id === req.currentUser?.id) {
      return next();
    }
  } catch (error) {
    return error;
  }
}
