import { BookBorrowerDto } from "./bookBorrower.dto";
import { ApiError } from "../../utils/interfaces/Errors";
import prisma from "../../prismaClient";

export const createBookBorrower = async (bookBorrowerDto: BookBorrowerDto) => {
  try {
    const bookBorrower = await prisma.bookBorrower.create({
      data: {
        name: bookBorrowerDto.name,
        email: bookBorrowerDto.email,
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

export const getBookBorrowerById = async (id: number) => {
  try {
    return await prisma.bookBorrower.findUnique({
      where: { id, isDeleted: false },
    });
  } catch (err: any) {
    const error: ApiError = { ...err, message: `Failed to get a bookBorrower` };
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
        name: bookBorrowerDto.name,
        email: bookBorrowerDto.email,
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
