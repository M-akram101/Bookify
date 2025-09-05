import { BorrowerDto } from "./borrower.dto";
import { ApiError } from "../../utils/interfaces/Errors";
import prisma from "../../prismaClient";

export const createBorrower = async (borrowerDto: BorrowerDto) => {
  try {
    const borrower = await prisma.borrower.create({
      data: {
        bookId: borrowerDto.bookId,
        borrowerId: borrowerDto.borrowerId,
        dueDate: borrowerDto.dueDate,
        dateReturned: borrowerDto.dateReturned,
        status: borrowerDto.status,
      },
    });
    return borrower;
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to create borrower`,
    };
    throw error;
  }
};

export const getAllBorrowers = async () => {
  try {
    return await prisma.borrower.findMany();
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to get borrower; ${err.message}`,
    };
    throw error;
  }
};

export const getBorrowerById = async (id: number) => {
  try {
    return await prisma.borrower.findUnique({
      where: { id, isDeleted: false },
    });
  } catch (err: any) {
    const error: ApiError = { ...err, message: `Failed to get a borrower` };
    throw error;
  }
};

export const updateBorrower = async (id: number, borrowerDto: BorrowerDto) => {
  try {
    const borrower = await prisma.borrower.update({
      where: { id: id, isDeleted: false },
      data: {
        bookId: borrowerDto.bookId,
        borrowerId: borrowerDto.borrowerId,
        dueDate: borrowerDto.dueDate,
        dateReturned: borrowerDto.dateReturned,
        status: borrowerDto.status,
      },
    });
    return borrower;
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to update borrower`,
    };
    throw error;
  }
};

export const deleteBorrower = async (id: number) => {
  try {
    const borrower = await prisma.borrower.update({
      where: { id: id },
      data: { isDeleted: true },
    });
    return borrower;
  } catch (err: any) {
    const error: ApiError = {
      ...err,
      message: `Failed to delete borrower`,
    };
    throw error;
  }
};
