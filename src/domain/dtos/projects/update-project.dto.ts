import { Challenge } from '@prisma/client';

export interface UpdateProjectDTO {
  name: string;
  description: string;
  challenge: Challenge;
  imageUrl: string;
  requirements: string[];
}
