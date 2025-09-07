import Joi from "joi";

export interface BorrowerDto {
  name: string;
  email: string;
}

export const createBorrowerSchema = Joi.object<BorrowerDto>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const updateBorrowerSchema = Joi.object<BorrowerDto>({
  name: Joi.string().optional(),
  email: Joi.string().email().required(),
});
