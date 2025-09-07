import { createAsyncRouter } from "../../utils/asyncRouter";
import {
  createBookBorrowerController,
  getAllBookBorrowersController,
  getBookBorrowerByIdController,
  updateBookBorrowerController,
  deleteBookBorrowerController,
  returnBookController,
} from "./bookBorrower.controller";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createBookBorrowerSchema,
  updateBookBorrowerSchema,
} from "./bookBorrower.dto";
import { getAllOverdueBorrowingsController } from "../borrower/borrower.controller";
import { testLimiter } from "../../utils/limiter";

const router = createAsyncRouter();

router.post(
  "",
  testLimiter,
  validateRequest(createBookBorrowerSchema),
  createBookBorrowerController
);
router.get("", getAllBookBorrowersController);
router.get("/overdue", getAllOverdueBorrowingsController);

router.get("/:borrowerId", getBookBorrowerByIdController);
router.put(
  "/:id",
  validateRequest(updateBookBorrowerSchema),
  updateBookBorrowerController
);

router.put("/return-book/:id", testLimiter, returnBookController);
router.delete("/:id", deleteBookBorrowerController);

export default router;
