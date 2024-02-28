import { Challenge } from '@prisma/client';

export interface CreateProjectDTO {
  name: string;
  description: string;
  challenge: Challenge;
  imageUrl: string;
  requirements: string[];
}
