const routes = require('express').Router();
const { paymentService } = require('../services/paymentServices');

routes.post('/', async(req, res) => {
  res.send(await paymentService(req, res));
});

module.exports = routes;