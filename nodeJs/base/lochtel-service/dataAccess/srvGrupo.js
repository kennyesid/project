const { getDocument } = require('./mongoConnection');
const { clsResponse } = require('../models/responseModel');
const config = require('../util/config');

const findGroup = async(type, codService, order) => {
  let result = {};
  let vClsResponse = new clsResponse();
  let query = {
    TYPE: type,
    COD_SERVICIO: codService
  };

  let param = {
    orden: order
  };

  await getDocument(config.MONGO_URL, config.MONGO_DB_NAME, config.MONGO_COLLECTION_GRUPOS, query, param)
    .then((data) => {
      vClsResponse.errCode = 0;
      vClsResponse.errMsg = '';
      vClsResponse.data = data;
      console.log('RESPONSE MONGO DB: ' + JSON.stringify(vClsResponse));
    })
    .catch(ex => {
      console.log('ERROR EN LA CONEXION CON MONGO: ' + JSON.stringify(ex));
    });
  return result;
};

module.exports = {
  findGroup
};
