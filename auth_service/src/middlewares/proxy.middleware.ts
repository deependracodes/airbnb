import { createProxyMiddleware } from "http-proxy-middleware";
import { serverConfig } from "../config";
import { Request } from "express";

// Custom proxy middleware factory that injects user context upstream

export const createServiceProxy = (targetUrl: string) => {
  return createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        // Explicitly cast req to Express Request to access your global types
        const expressReq = req as Request;

        if (expressReq.user_id) {
          proxyReq.setHeader("x-user-id", expressReq.user_id);
        }
        
        if (expressReq.user_roles) {
          proxyReq.setHeader("x-user-roles", JSON.stringify(expressReq.user_roles));
        }

        if (expressReq.correlationId) {
          proxyReq.setHeader("x-correlation-id", expressReq.correlationId);
        }

        // Prevent header spoofing from the client side
        proxyReq.removeHeader("x-internal-gateway-secret");
      },
    },
  });
};

export const hotelsProxy = createServiceProxy(serverConfig.HOTELS_SERVICE_URL);
export const bookingsProxy = createServiceProxy(serverConfig.BOOKINGS_SERVICE_URL);
export const reviewsProxy = createServiceProxy(serverConfig.REVIEW_SERVICE_URL);
