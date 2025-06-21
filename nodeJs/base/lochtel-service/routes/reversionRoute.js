const routes = require('express').Router();
const { reversionService } = require('../services/reversionServices');

routes.post('/', async(req, res) => {
  const response = await reversionService(req, res);
  res.send(response);
});

module.exports = routes;