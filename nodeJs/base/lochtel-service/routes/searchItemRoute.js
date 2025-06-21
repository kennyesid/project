const routes = require('express').Router();
const { searchDeuda } = require('../services/searchItemService');
const { getCriterioForService } = require('../util/buildCriteriaSoap');

routes.post('/', async(req, res) => {
  req.body.data.criterio = getCriterioForService(req.body.data.serviceId);
  req.body.data.filtro[0].alias = 'nroContrato';
  req.body.data.filtro[0].valor = req.body.data.filtro[0].value;
  const responseService = await searchDeuda(req, res);
  res.send(responseService);
});

module.exports = routes;
