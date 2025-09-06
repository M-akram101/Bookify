import { createAsyncRouter } from "../../utils/asyncRouter";
import {
  createBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
} from "./book.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createBookSchema, updateBookSchema } from "./book.dto";

const router = createAsyncRouter();

router.post("", validateRequest(createBookSchema), createBookController);
router.get("", getAllBooksController);
router.get("/:id", getBookByIdController);
router.put("/:id", validateRequest(updateBookSchema), updateBookController);
router.delete("/:id", deleteBookController);

export default router;
