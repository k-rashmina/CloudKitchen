const express = require("express");
const dotenv = require("dotenv");
const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");

dotenv.config();

const router = express.Router();

router.use(
  "/restaurant",
  createProxyMiddleware({
    target: "http://restaurant-service:5002",
    changeOrigin: true,
    pathRewrite: {
      "^/restaurant": "",
    },
  })
);

router.use(
  "/order",
  createProxyMiddleware({
    target:"http://order-service:5003",
    changeOrigin: true,
    pathRewrite: {
      "^/order": "",
    },
  })
);

router.use(
  "/delivery",
  createProxyMiddleware({
    target: "http://delivery-service:5004",
    changeOrigin: true,
    pathRewrite: {
      "^/delivery": "",
    },
  })
);

router.use(
  "/auth-service",
  createProxyMiddleware({
    target: "http://auth-service:5001",
    changeOrigin: true,
    pathRewrite: { "^/auth-service": "" },
    // Fix the request body for POST requests
    // This is necessary because the auth-service expects a JSON body
  on:{
    proxyReq:fixRequestBody
  }})
);

router.use(
  "/payment",
  createProxyMiddleware({
    target: "http://payment-service:5006",
    changeOrigin: true,
    pathRewrite: { "^/payment": "" },
  })
);

router.use(
  "/notification",  
  createProxyMiddleware({
    target: "http://notification-service:5005",
    changeOrigin: true,
    pathRewrite: { "^/notification": "" },
  })
);

module.exports = router;
