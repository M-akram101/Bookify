import { BookBorrowerDto } from "./bookBorrower.dto";
import { ApiError } from "../../utils/interfaces/Errors";
import prisma from "../../prismaClient";

export const createBookBorrower = async (bookBorrowerDto: BookBorrowerDto) => {
  try {
    const bookBorrower = await prisma.bookBorrower.create({
      data: {
        bookId: bookBorrowerDto.bookId,
        borrowerId: bookBorrowerDto.borrowerId,
        dueDate: bookBorrowerDto.dueDate,
        status: bookBorrowerDto.status,
      },
    });
    return bookBorrower;
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to create bookBorrower`,
    };
    throw error;
  }
};

export const getAllBookBorrowers = async () => {
  try {
    return await prisma.bookBorrower.findMany();
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to get bookBorrower; ${err.message}`,
    };
    throw error;
  }
};
export const getAllOverdueBorrowings = async () => {
  try {
    return await prisma.bookBorrower.findMany({
      where: {
        dueDate: { lt: new Date() },
        status: { not: "RETURNED" },
        isDeleted: false,
      },
      // include: {
      //   book: true,
      //   borrower: true,
      // },
    });
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to get bookBorrower; ${err.message}`,
    };
    throw error;
  }
};

export const getBorrowingsByBorrowerId = async (borrowerId: number) => {
  try {
    return await prisma.bookBorrower.findMany({
      where: {
        borrowerId,
        isDeleted: false,
        status: { not: "RETURNED" },
      },
      // include: {
      //   book: true,
      //   borrower: true,
      // },
    });
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to get active book borrow records`,
    };
    throw error;
  }
};

export const updateBookBorrower = async (
  id: number,
  bookBorrowerDto: BookBorrowerDto
) => {
  try {
    const bookBorrower = await prisma.bookBorrower.update({
      where: { id: id, isDeleted: false },
      data: {
        bookId: bookBorrowerDto.bookId,
        borrowerId: bookBorrowerDto.borrowerId,
        dueDate: bookBorrowerDto.dueDate,
        dateReturned: bookBorrowerDto.dateReturned,
        status: bookBorrowerDto.status,
      },
    });
    return bookBorrower;
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to update bookBorrower`,
    };
    throw error;
  }
};

export const returnBook = async (id: number) => {
  try {
    const bookBorrower = await prisma.bookBorrower.update({
      where: { id }, // only unique constraint
      data: {
        dateReturned: new Date(),
        status: "RETURNED",
      },
    });
    return bookBorrower;
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to return book`,
    };
    throw error;
  }
};

export const deleteBookBorrower = async (id: number) => {
  try {
    const bookBorrower = await prisma.bookBorrower.update({
      where: { id: id },
      data: { isDeleted: true },
    });
    return bookBorrower;
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to delete bookBorrower`,
    };
    throw error;
  }
};
