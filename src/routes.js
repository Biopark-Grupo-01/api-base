import { Router } from "express";

import handlers from "./middlewares/handlers.js";
import order from "./middlewares/order.js";
import hateoas from "./middlewares/hateoas.js";

import InternalServerError from "./routes/helper/500.js"
import NotFound from "./routes/helper/404.js";

import AuthRouter from "./routes/auth/authRouter.js"
import UserRouter from "./routes/user/userRouter.js"
import ProductRouter from "./routes/product/productRouter.js"
import TaskRouter from "./routes/task/taskRouter.js"

import { verify } from "./controllers/authController.js";

const routes = Router()
routes.use(handlers);
routes.use(order);
routes.use(hateoas);

routes.use("/login", AuthRouter);
routes.use("/api/users", verify, UserRouter)
routes.use("/api/products", verify, ProductRouter);
routes.use("/api/tasks", TaskRouter);

routes.use(InternalServerError)
routes.use(NotFound);


export default routes;
