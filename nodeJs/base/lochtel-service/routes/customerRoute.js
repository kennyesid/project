const routes = require('express').Router();
const { getCustomer } = require('../services/customerServices');
const { getCriterioForService } = require('../util/buildCriteriaSoap');

routes.post('/', async(req, res) => {
  req.body.data.criterio = getCriterioForService(req.body.data.serviceId);
  const responseService = await getCustomer(req, res);
  res.send(responseService);
});

module.exports = routes;