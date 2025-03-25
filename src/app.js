import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import hateos from "./middlewares/hateos.js";
import dotenv from "dotenv";

import database from "./config/database.js";
import routes from "./routes.js";

dotenv.config();
database.config(process.env.DATABASE);

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(hateos);
app.use(routes);

export default app;
