///
import Joi from "joi";
import { BorrowStatus } from "@prisma/client";

export interface BookBorrowerDto {
  bookId: number;
  borrowerId: number;
  dueDate: Date;
  dateReturned?: Date;
  status: BorrowStatus;
}

export const createBookBorrowerSchema = Joi.object<BookBorrowerDto>({
  bookId: Joi.number().required(),
  borrowerId: Joi.number().required(),
  dueDate: Joi.date().required(),
  status: Joi.string()
    .valid(...Object.values(BorrowStatus))
    .required(),
});

export const updateBookBorrowerSchema = Joi.object<BookBorrowerDto>({
  bookId: Joi.number().required(),
  borrowerId: Joi.number().required(),
  dueDate: Joi.date().required(),
  dateReturned: Joi.date().optional().allow(null),
  status: Joi.string()
    .valid(...Object.values(BorrowStatus))
    .required(),
});
