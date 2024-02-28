import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  POSTGRES_USER: get('POSTGRES_USER').required().asString(),
  POSTGRES_DB: get('POSTGRES_DB').required().asString(),
  POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString(),
  POSTGRES_PORT: get('POSTGRES_PORT').required().asString(),
  APP_SECRET: get('APP_SECRET').required().asString(),
  EXPIRES: get('EXPIRES').required().asString(),
};
