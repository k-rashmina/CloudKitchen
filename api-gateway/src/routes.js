const express = require("express");
const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

const router = express.Router();

router.use(
  "/restaurant",
  createProxyMiddleware({
    target: process.env.RESTAURANT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/restaurant": "",
    },
  })
);

router.use(
  "/order",
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/order": "",
    },
  })
);

router.use(
  "/delivery",
  createProxyMiddleware({
    target: process.env.DELIVERY_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/delivery": "",
    },
  })
);

router.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/auth-service": "" },
  })
);

router.use(
  "/payment",
  createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/payment": "" },
  })
);

router.use(
  "/notification",
  createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/notification": "" },
  })
);

module.exports = router;
