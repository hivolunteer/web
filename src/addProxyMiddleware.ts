const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost",
    changeOrigin: true,
  })
);
app.listen(8000);

export {};
