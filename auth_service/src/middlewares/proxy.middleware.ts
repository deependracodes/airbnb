import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { serverConfig } from "../config/index.js";
import { Request } from "express";

export const createServiceProxy = (targetUrl: string) => {
  return createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: (path, req:Request) => {
      return req.originalUrl; 
    },

    on: {
      proxyReq: (proxyReq, req) => {
        const expressReq = req as Request;

        // Inject identity contexts
        if (expressReq.user_id) {
          proxyReq.setHeader("x-user-id", String(expressReq.user_id));
        }
        if (expressReq.user_roles) {
          proxyReq.setHeader("x-user-roles", JSON.stringify(expressReq.user_roles));
        }
        if (expressReq.correlationId) {
          proxyReq.setHeader("x-correlation-id", expressReq.correlationId);
        }

        proxyReq.removeHeader("x-internal-gateway-secret");

        // Solves the app.use(express.json()) payload freeze issue
        fixRequestBody(proxyReq, req);
      },
      error: (err, req, res) => {
        console.error(`[Gateway Proxy Error connecting to ${targetUrl}]:`, err.message);
        // res.status(502).json({ error: "Downstream service unavailable." });
      }
    },
  });
};

// Clean mapping without trailing prefix strings
export const bookingsProxy = createServiceProxy(serverConfig.BOOKINGS_SERVICE_URL);
export const reviewsProxy = createServiceProxy(serverConfig.REVIEW_SERVICE_URL);
export const hotelsProxy = createServiceProxy(serverConfig.HOTELS_SERVICE_URL); 
