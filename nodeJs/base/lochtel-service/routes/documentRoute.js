const routes = require('express').Router();
const { documentService } = require('../services/documentService');

routes.post('/', async(req, res) => {
  const response = await documentService(req, res);
  res.send(response);
});

module.exports = routes;