// src/setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  root.use(
    "/api", // this is the context of the proxy
    createProxyMiddleware({
      target: "http://localhost:8000", // the target server
      changeOrigin: true,
      secure: false,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
  );
};
