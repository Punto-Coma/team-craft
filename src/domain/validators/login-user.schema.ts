import Joi from 'joi';

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
});

export { loginUserSchema };
