import { Router } from "express";

import userRoute from "./routes/user/userRoute.js"
import productRoute from "./routes/product/productRoute.js"

const router = Router()
  .use("/users", userRoute)
  .use("/products", productRoute);


export default router;