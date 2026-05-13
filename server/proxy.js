const { createProxyMiddleware } = require('http-proxy-middleware');

function proxy(target) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    onProxyRes(proxyRes) {
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
    }
  });
}

module.exports = proxy;