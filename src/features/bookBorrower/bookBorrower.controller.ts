import { Request, Response, NextFunction } from "express";
import {
  createBookBorrower,
  getAllBookBorrowers,
  getBookBorrowerById,
  updateBookBorrower,
  deleteBookBorrower,
} from "./bookBorrower.service";
import { BookBorrowerDto } from "./bookBorrower.dto";
import {
  badRequest,
  notFound,
  success,
  successCreation,
  successNoContent,
} from "../../utils/httpResponses";

export const createBookBorrowerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookBorrowerData: BookBorrowerDto = {
    ...req.body,
  };
  const bookBorrower = await createBookBorrower(bookBorrowerData);
  successCreation(res, bookBorrower);
};

export const getAllBookBorrowersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookBorrowers = await getAllBookBorrowers();
  success(res, bookBorrowers);
};

export const getBookBorrowerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const bookBorrower = await getBookBorrowerById(Number(id));
  if (!bookBorrower) {
    notFound(res, "BookBorrower not found");
    return;
  }
  success(res, bookBorrower);
};

export const updateBookBorrowerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const bookBorrowerDto: BookBorrowerDto = req.body;

  const bookBorrowerData = await updateBookBorrower(
    Number(id),
    bookBorrowerDto
  );
  if (!bookBorrowerData) {
    notFound(res, "BookBorrower Session not found");
    return;
  }
  success(res, bookBorrowerData);
};

export const deleteBookBorrowerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const deletedBookBorrower = await deleteBookBorrower(Number(id));
  if (!deletedBookBorrower) {
    notFound(res, "BookBorrower not found");
    return;
  }
  successNoContent(res);
};
