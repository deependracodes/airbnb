import express, { Express } from "express";
import { serverConfig } from "./config/index.js";
import v1Router from "./router/v1/index.router.js";
import v2Router from "./router/v2/index.router.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import logger from "./config/logger.config.js";
import { correlationMiddleware } from "./middlewares/corelation.middleware.js";
import { connectDB } from "./config/db.conn.js";
import { globalLimiter } from "./middlewares/rate-limiter.middleware.js";

const app: Express = express();
const port = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Apply global rate limiter to all incoming requests at the application level
app.use(globalLimiter);
app.use(correlationMiddleware);

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

app.use(errorMiddleware);

app.listen(port, () => {
  connectDB();
  logger.info(`Server running on http://localhost:${port}`);

});
