import { Request, Response, NextFunction } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "./book.service";
import { BookDto } from "./book.dto";
import {
  badRequest,
  notFound,
  success,
  successCreation,
  successNoContent,
} from "../../utils/httpResponses";

export const createBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookData: BookDto = {
    ...req.body,
  };
  const book = await createBook(bookData);
  successCreation(res, book);
};

export const getAllBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const books = await getAllBooks();
  success(res, books);
};

export const getBookByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const book = await getBookById(Number(id));
  if (!book) {
    notFound(res, "Book not found");
    return;
  }
  success(res, book);
};

export const updateBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const bookDto: BookDto = req.body;

  const bookData = await updateBook(Number(id), bookDto);
  if (!bookData) {
    notFound(res, "Book Session not found");
    return;
  }
  success(res, bookData);
};

export const deleteBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const deletedBook = await deleteBook(Number(id));
  if (!deletedBook) {
    notFound(res, "Book not found");
    return;
  }
  successNoContent(res);
};
