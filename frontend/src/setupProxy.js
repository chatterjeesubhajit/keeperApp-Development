const {
    createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api/**', {
        target: 'http://localhost:5000',
        changeOrigin: true
    }));
    app.use(createProxyMiddleware('/auth/facebook', {
        target: 'http://localhost:5000',
        changeOrigin: true
    }));
    app.use(createProxyMiddleware('/auth/google', {
        target: 'http://localhost:5000',
        changeOrigin: true
    }));
    app.use(createProxyMiddleware('/auth/logout', {
        target: 'http://localhost:5000',
        changeOrigin: true
    }));
    
};