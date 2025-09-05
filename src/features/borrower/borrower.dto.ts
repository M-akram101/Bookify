import Joi from "joi";
import { BorrowStatus } from "@prisma/client";

export interface BorrowerDto {
  bookId: number;
  borrowerId: number;
  dueDate: Date;
  dateReturned?: Date;
  status: BorrowStatus;
}

export const createBorrowerSchema = Joi.object<BorrowerDto>({
  bookId: Joi.number().required(),
  borrowerId: Joi.number().required(),
  dueDate: Joi.date().required(),
  dateReturned: Joi.date().optional(),
  status: Joi.string()
    .valid(...Object.values(Status))
    .required(),
});

export const updateBorrowerSchema = Joi.object<BorrowerDto>({
  bookId: Joi.number().required(),
  borrowerId: Joi.number().required(),
  dueDate: Joi.date().required(),
  dateReturned: Joi.date().optional(),
  status: Joi.string()
    .valid(...Object.values(Status))
    .required(),
});
