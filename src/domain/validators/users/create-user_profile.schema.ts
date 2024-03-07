import Joi from 'joi';
import { Country } from '../../enums/country.enum';

export const createUserProfileSchema = Joi.object({
  phone: Joi.string().allow(null),
  discord: Joi.string().allow(null),
  country: Joi.string()
    .valid(...Object.values(Country))
    .required(),
  score: Joi.number().required(),
  techStack: Joi.array().items(Joi.string()),
});
