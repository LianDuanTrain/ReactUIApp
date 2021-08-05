const proxy= require('http-proxy-middleware');

module.exports = function(app) {

  app.use('http://localhost:9999/users', proxy({
    target: 'http://localhost:9999',
    changeOrigin: true,
  }));

};