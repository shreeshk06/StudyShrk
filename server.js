const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

// Proxy configuration for play.echovideo.ru
app.use('/echovideo', createProxyMiddleware({
  target: 'https://play.echovideo.ru',
  changeOrigin: true,
}));

// Serve React app from public folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
