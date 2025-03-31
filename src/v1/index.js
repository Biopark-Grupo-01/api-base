import { Router } from "express";

import userRoute from "./routes/userRoute.js"

const router = Router()
  .use("/users", userRoute);


export default router;