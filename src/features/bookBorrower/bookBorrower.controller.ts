import { Request, Response, NextFunction } from "express";
import {
  createBookBorrower,
  getAllBookBorrowers,
  updateBookBorrower,
  deleteBookBorrower,
  returnBook,
  getBorrowingsByBorrowerId,
} from "./bookBorrower.service";
import { BookBorrowerDto } from "./bookBorrower.dto";
import {
  badRequest,
  notFound,
  success,
  successCreation,
  successNoContent,
} from "../../utils/httpResponses";
import { getBookById, updateBook } from "../book/book.service";

export const createBookBorrowerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookBorrowerData: BookBorrowerDto = {
    ...req.body,
  };

  const bookData = await getBookById(bookBorrowerData.bookId);
  // checks if there are available copies of the book to borrow
  if (!bookData) {
    notFound(res, "Book not found");
    return;
  }
  if (bookData?.availableQuantity < 1) {
    badRequest(res, "No available copies of the book to borrow.");
    return;
  }

  const bookBorrower = await createBookBorrower(bookBorrowerData);

  bookData.availableQuantity = bookData.availableQuantity - 1;

  await updateBook(bookData.id, bookData);

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
  const { borrowerId } = req.params;

  const borrowings = await getBorrowingsByBorrowerId(Number(borrowerId));
  if (!borrowings || borrowings.length === 0) {
    notFound(res, "No active borrowings found for this borrower");
    return;
  }

  success(res, borrowings);
};
// export const getBookBorrowerByIdController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { borrowerId } = req.params;

//   const bookBorrowers = await getBorrowingsByBorrowerId(Number(borrowerId));
//   if (!bookBorrowers || bookBorrowers.length === 0) {
//     notFound(res, "No borrowings found for this borrower");
//     return;
//   }

//   success(res, bookBorrowers);
// };

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

export const returnBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const bookBorrowerData = await returnBook(Number(id));

  if (!bookBorrowerData) {
    notFound(res, "BookBorrower session not found");
    return;
  }

  // get book details and increment available quantity
  const bookData = await getBookById(bookBorrowerData.bookId);
  if (bookData) {
    await updateBook(bookData.id, {
      ...bookData,
      availableQuantity: bookData.availableQuantity + 1,
    });
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
