import { Router } from "express"

import { 
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../../controllers/userController.js";

import validator from "../../../middlewares/validator.js";
import schema from "./userValidator.js";

const router = Router();
router.get("/:_id", getUser);
router.get("/", getUsers);
router.post("/", validator(schema), createUser);
router.put("/:_id", validator(schema), updateUser);
router.delete("/:_id", deleteUser);

export default router;