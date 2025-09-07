import Joi from "joi";

export interface BookDto {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  totalQuantity: number;
  availableQuantity: number;
  shelfLocation: string;
}

export const createBookSchema = Joi.object<BookDto>({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  totalQuantity: Joi.number().required().min(0),
  availableQuantity: Joi.number().required().min(0),
  shelfLocation: Joi.string().required(),
});

export const updateBookSchema = Joi.object<BookDto>({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  totalQuantity: Joi.number().required(),
  availableQuantity: Joi.number().required(),
  shelfLocation: Joi.string().required(),
});
