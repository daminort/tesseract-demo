/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://localhost:3010',
			pathRewrite: { '^/api': '/api' },
			headers: { 'X-Forwarded-Prefix': '/api' },
			changeOrigin: false,
			logLevel: 'debug',
		}),
	);
	app.use(
		createProxyMiddleware('/uploads', {
			target: 'http://localhost:3010/uploads',
			pathRewrite: { '^/uploads': '/uploads' },
			headers: { 'X-Forwarded-Prefix': '/uploads' },
			changeOrigin: false,
			logLevel: 'debug',
		}),
	);
};
