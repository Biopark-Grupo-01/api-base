import { Router } from "express";

import InternalServerError from "./routes/helper/500.js"
import v1 from "./v1/index.js"
import NotFound from "./routes/helper/404.js";

const routes = Router()
  .use(InternalServerError)
  .use("/api/v1", v1)
  .use(NotFound);

export default routes;
