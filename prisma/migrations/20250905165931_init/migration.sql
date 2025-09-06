-- CreateEnum
CREATE TYPE "public"."BorrowStatus" AS ENUM ('BORROWED', 'RETURNED', 'OVERDUE');

-- CreateTable
CREATE TABLE "public"."Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "total_quantity" INTEGER NOT NULL,
    "available_quantity" INTEGER NOT NULL,
    "shelf_location" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Borrower" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Borrower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BookBorrower" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "borrower_id" INTEGER NOT NULL,
    "date_borrowed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3) NOT NULL,
    "date_returned" TIMESTAMP(3),
    "status" "public"."BorrowStatus" NOT NULL DEFAULT 'BORROWED',
    "is_deleted" BOOLEAN NOT NULL,

    CONSTRAINT "BookBorrower_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "public"."Book"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Borrower_email_key" ON "public"."Borrower"("email");

-- AddForeignKey
ALTER TABLE "public"."BookBorrower" ADD CONSTRAINT "BookBorrower_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookBorrower" ADD CONSTRAINT "BookBorrower_borrower_id_fkey" FOREIGN KEY ("borrower_id") REFERENCES "public"."Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
