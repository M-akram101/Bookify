import { createAsyncRouter } from "../../utils/asyncRouter";
import {
  createBookBorrowerController,
  getAllBookBorrowersController,
  getBookBorrowerByIdController,
  updateBookBorrowerController,
  deleteBookBorrowerController,
} from "./bookBorrower.controller";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createBookBorrowerSchema,
  updateBookBorrowerSchema,
} from "./bookBorrower.dto";

const router = createAsyncRouter();

router.post(
  "",
  validateRequest(createBookBorrowerSchema),
  createBookBorrowerController
);
router.get("", getAllBookBorrowersController);
router.get("/:id", getBookBorrowerByIdController);
router.put(
  "/:id",
  validateRequest(updateBookBorrowerSchema),
  updateBookBorrowerController
);
router.delete("/:id", deleteBookBorrowerController);

export default router;
