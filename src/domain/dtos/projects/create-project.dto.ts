import { Challenge } from '@prisma/client';

export interface CreateProjectDTO {
  userId: string;
  name: string;
  description: string;
  challenge: Challenge;
  imageUrl: string;
  requirements: string[];
}
