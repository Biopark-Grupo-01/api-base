import { Router } from "express";

import InternalServerError from "./routes/helper/500.js"
import userRoute from "./routes/userRoute.js"
import NotFound from "./routes/helper/404.js";

const routes = Router()
  .use(InternalServerError)
  .use("/api/users", userRoute)
  .use(NotFound);

export default routes;
