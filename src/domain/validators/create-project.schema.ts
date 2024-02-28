import Joi from 'joi';

export const createProjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  challenge: Joi.string().valid('EASY', 'MEDIUM', 'HARD').required(),
  imageUrl: Joi.string().required(),
  requirements: Joi.array().items(Joi.string()).required(),
});
