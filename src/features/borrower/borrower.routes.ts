import { createAsyncRouter } from "../../utils/asyncRouter";
import {
  createBorrowerController,
  getAllBorrowersController,
  getBorrowerByIdController,
  updateBorrowerController,
  deleteBorrowerController,
} from "./borrower.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createBorrowerSchema, updateBorrowerSchema } from "./borrower.dto";

const router = createAsyncRouter();

router.post(
  "",
  validateRequest(createBorrowerSchema),
  createBorrowerController
);
router.get("", getAllBorrowersController);
router.get("/:id", getBorrowerByIdController);
router.put(
  "/:id",
  validateRequest(updateBorrowerSchema),
  updateBorrowerController
);
router.delete("/:id", deleteBorrowerController);

export default router;
