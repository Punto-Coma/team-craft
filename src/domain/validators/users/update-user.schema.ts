import Joi from 'joi';

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(10),
  email: Joi.string().email(),
});

export { updateUserSchema };
