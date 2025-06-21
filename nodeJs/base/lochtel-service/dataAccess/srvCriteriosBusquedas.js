const { getDocument } = require('./mongoConnection');
const config = require('../util/config');

const findCriteria = async(servicio, identificador, order) => {
  let result = {};
  let query = {
    SERVICIO: servicio,
    IDENTIFICADOR: identificador
  };
  let param = {
    orden:order
  };
  await getDocument(config.MONGO_URL, config.MONGO_DB_NAME, config.MONGO_COLLECTION_BUSQUEDAS, query, param)
    .then((data) => {
      result = data;
    })
    .catch(() => {
      console.log('NO SE PUDO ESTABLECER CONEXION CON LA BASE DE DATOS');
    });

  return result;
};

module.exports = {
  findCriteria
};