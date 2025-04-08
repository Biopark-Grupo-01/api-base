import { Router } from "express"

import { 
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../../controllers/productController.js";

import validator from "../../middlewares/validator.js";
import schema from "./productValidator.js";

const router = Router();
router.get("/:_id", getProduct);
router.get("/", getProducts);
router.post("/", validator(schema), createProduct);
router.put("/:_id", validator(schema), updateProduct);
router.delete("/:_id", deleteProduct);

export default router;