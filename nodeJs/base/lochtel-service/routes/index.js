const routes = require('express').Router();
const notPageFound = require('./notPageFound');
const searchCriteriaRoute = require('../routes/searchCriteriaRoute');
const customerRoute = require('./customerRoute');
const searchItemRote = require('./searchItemRoute');
const paymentRoute = require('./paymentRoute');
const reversionRoute = require('./reversionRoute');
const documentRoute = require('./documentRoute');

routes.use('/api/v1/criteriosbusquedas', searchCriteriaRoute);
routes.use('/api/v1/clientes', customerRoute);
routes.use('/api/v1/deudas', searchItemRote);
routes.use('/api/v1/pagos', paymentRoute);
routes.use('/api/v1/revertir', reversionRoute);
routes.use('/api/v1/documentos', documentRoute);
routes.use('/', notPageFound);

module.exports = routes;