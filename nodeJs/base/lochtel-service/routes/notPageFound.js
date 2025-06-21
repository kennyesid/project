const routes = require('express').Router();

routes.all('*', (req, res) => {
  res.status(404);
  res.json({
    errCode: '404',
    errMsg: 'Ruta no encontrada',
    data: {}
  });
});

module.exports = routes;
