import express, { Express } from "express";
import { serverConfig } from "./config/index.js";
import v1Router from "./router/v1/index.router.js";
import v2Router from "./router/v2/index.router.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import logger from "./config/logger.config.js";
import { correlationMiddleware } from "./middlewares/corelation.middleware.js";
import { connectDB } from "./config/db.conn.js";
import { globalLimiter } from "./middlewares/rate-limiter.middleware.js";
import { bookingsProxy, hotelsProxy ,reviewsProxy} from "../src/middlewares/proxy.middleware.js";
import { authentication } from "./middlewares/authentication.middleware.js";
import { authorization } from "./middlewares/authorization.middleware.js";

const app: Express = express();
const port = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Apply global rate limiter to all incoming requests at the application level
app.use(globalLimiter);
app.use(correlationMiddleware);

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

// app.use(/\/api\/v\d+\/hotels|\/hotels/, hotelsProxy);
// app.use(/\/api\/v\d+\/bookings|\/bookings/, bookingsProxy);
// app.use(/\/api\/v\d+\/reviews|\/reviews/, reviewsProxy);

// 1. Hotels Proxy
// Public read access, but protected write/delete actions
app.use("/api/v1/hotels", (req, res, next) => {
  if (req.method === "GET") {
    return hotelsProxy(req, res, next);
  }
  // Mutating operations require authentication and host/admin role
  return authentication(req, res, () => {
    authorization("host", "admin")(req, res, () => {
      hotelsProxy(req, res, next);
    });
  });
});

// 2. Bookings Proxy
// All booking actions require authentication (guests or admins)
app.use("/api/v1/bookings", authentication, (req, res, next) => {
  authorization("guest", "admin")(req, res, () => {
    bookingsProxy(req, res, next);
  });
});

// 3. Reviews Proxy
// Reading reviews is public, writing requires authentication
app.use("/api/v1/reviews", (req, res, next) => {
  if (req.method === "GET") {
    return reviewsProxy(req, res, next);
  }
  return authentication(req, res, () => {
    authorization("guest", "admin")(req, res, () => {
      reviewsProxy(req, res, next);
    });
  });
});


app.use(errorMiddleware);

async function startServer() {
  try {
    // 1. Establish database connection first
    await connectDB();
    logger.info("Database connected successfully");

    // 2. Start listening only after DB is ready
    app.listen(port, () => {
      logger.info(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    logger.error("Failed to start server due to startup error:", error);
    process.exit(1);
  }
}

startServer();
