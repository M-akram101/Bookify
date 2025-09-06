import { BookDto } from "./book.dto";
import { ApiError } from "../../utils/interfaces/Errors";
import prisma from "../../prismaClient";

export const createBook = async (bookDto: BookDto) => {
  try {
    const book = await prisma.book.create({
      data: {
        title: bookDto.title,
        author: bookDto.author,
        isbn: bookDto.isbn,
        totalQuantity: bookDto.totalQuantity,
        availableQuantity: bookDto.availableQuantity,
        shelfLocation: bookDto.shelfLocation,
      },
    });
    return book;
  } catch (err: any) {
    const error: ApiError = { ...err, message: `Failed to create book` };
    throw error;
  }
};

export const getAllBooks = async () => {
  try {
    return await prisma.book.findMany();
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to get book; ${err.message}`,
    };
    throw error;
  }
};

export const getBookById = async (id: number) => {
  try {
    return await prisma.book.findUnique({ where: { id, isDeleted: false } });
  } catch (err: any) {
    const error: ApiError = { ...err, message: `Failed to get a book` };
    throw error;
  }
};

export const updateBook = async (id: number, bookDto: BookDto) => {
  try {
    const book = await prisma.book.update({
      where: { id: id, isDeleted: false },
      data: {
        title: bookDto.title,
        author: bookDto.author,
        isbn: bookDto.isbn,
        totalQuantity: bookDto.totalQuantity,
        availableQuantity: bookDto.availableQuantity,
        shelfLocation: bookDto.shelfLocation,
      },
    });
    return book;
  } catch (err: any) {
    const error: ApiError = { ...err, message: `Failed to update book` };
    throw error;
  }
};

export const deleteBook = async (id: number) => {
  try {
    const book = await prisma.book.update({
      where: { id: id },
      data: { isDeleted: true },
    });
    return book;
  } catch (err: any) {
    const error: ApiError = { ...err, message: `Failed to delete book` };
    throw error;
  }
};
