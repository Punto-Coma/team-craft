import Joi from 'joi';

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .messages({
      'string.pattern.base': 'Password must have a Uppercase, lowercase letter and a number',
    }),
});

export { createUserSchema };
