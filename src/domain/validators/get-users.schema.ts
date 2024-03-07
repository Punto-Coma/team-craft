import Joi from 'joi';

export const getUsersSchema = Joi.object({
  limit: Joi.number().min(1).max(10).default(10),
  page: Joi.number().min(1).max(3).default(1),
});
