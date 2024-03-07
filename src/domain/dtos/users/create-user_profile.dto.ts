export interface CreateUserProfileDTO {
  userId: string;
  phone?: string | null;
  discord?: string | null;
  country: string;
  score: number;
  techStack: string[];
}
