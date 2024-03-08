import Joi from 'joi';

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(10),
  email: Joi.string().email(),
}).min(1);
