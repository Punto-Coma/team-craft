import Joi from 'joi';

export const addMemberGroupSchema = Joi.object({
  userId: Joi.string().required(),
});
