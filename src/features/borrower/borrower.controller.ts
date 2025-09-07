import { Request, Response, NextFunction } from "express";
import {
  createBorrower,
  getAllBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
} from "./borrower.service";
import { BorrowerDto } from "./borrower.dto";
import {
  badRequest,
  notFound,
  success,
  successCreation,
  successNoContent,
} from "../../utils/httpResponses";
import { getAllOverdueBorrowings } from "../bookBorrower/bookBorrower.service";

export const createBorrowerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const borrowerData: BorrowerDto = {
    ...req.body,
  };
  const borrower = await createBorrower(borrowerData);
  successCreation(res, borrower);
};

export const getAllBorrowersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const borrowers = await getAllBorrowers();
  success(res, borrowers);
};

export const getAllOverdueBorrowingsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const overdueBorrowings = await getAllOverdueBorrowings();

    if (!overdueBorrowings || overdueBorrowings.length === 0) {
      return notFound(res, "No overdue borrowings found");
    }

    success(res, overdueBorrowings);
  } catch (err) {
    next(err); // pass error to centralized error handler
  }
};

export const getBorrowerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const borrower = await getBorrowerById(Number(id));
  if (!borrower) {
    notFound(res, "Borrower not found");
    return;
  }
  success(res, borrower);
};

export const updateBorrowerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const borrowerDto: BorrowerDto = req.body;

  const borrowerData = await updateBorrower(Number(id), borrowerDto);
  if (!borrowerData) {
    notFound(res, "Borrower Session not found");
    return;
  }
  success(res, borrowerData);
};

export const deleteBorrowerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const deletedBorrower = await deleteBorrower(Number(id));
  if (!deletedBorrower) {
    notFound(res, "Borrower not found");
    return;
  }
  successNoContent(res);
};
