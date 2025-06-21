const routes = require('express').Router();
const { getCriteriaService } = require('../services/searchCriteriaService');

routes.post('/', async(req, res) => {

  const responseService = await getCriteriaService(req, res);
  res.send(responseService);
});

module.exports = routes;