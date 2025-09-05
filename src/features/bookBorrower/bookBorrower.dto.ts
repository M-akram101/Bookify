import Joi from "joi";

export interface BookBorrowerDto {
  name: string;
  email: string;
}

export const createBookBorrowerSchema = Joi.object<BookBorrowerDto>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const updateBookBorrowerSchema = Joi.object<BookBorrowerDto>({
  name: Joi.string().optional(),
  email: Joi.string().email().required(),
});
