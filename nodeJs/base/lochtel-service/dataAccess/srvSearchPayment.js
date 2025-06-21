const { getDocument } = require('./mongoConnection');
const config = require('../util/config');

const findSearchPayment = async(inputSearch, searchType) => {
  let result = {};

  let param = {
    orden:1
  };

  await getDocument(config.MONGO_URL, config.MONGO_DB_NAME, searchType === 'DEUDAS' ? config.MONGO_COLLECTION_LOCHTEL : config.MONGO_COLLECTION_PAGOS_LOCHTEL, inputSearch, param)
    .then((data) => {
      result = data;
    })
    .catch(exp => {
      console.log('error en la base de datos de mongose: ' + exp);
    });

  return result;
};

module.exports = {
  findSearchPayment
};