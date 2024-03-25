import Joi from 'joi';

export const groupSchema = Joi.object({
  projectId: Joi.string().required(),
  name: Joi.string().required(),
  projectEnds: Joi.date().allow(null).optional(),
});
