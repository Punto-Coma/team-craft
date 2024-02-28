import { Challenge } from '@prisma/client';

export interface CreateProjectDTO {
  id?: string;
  userId?: string;
  name: string;
  description: string;
  challenge: Challenge;
  imageUrl: string;
  requirements: string[];
}
