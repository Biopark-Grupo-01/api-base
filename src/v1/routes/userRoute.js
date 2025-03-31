import { Router } from "express"

import { 
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = Router();

router.get("/:_id", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:_id", updateUser);
router.delete("/:_id", deleteUser);

export default router;