const { saveDocument } = require('./mongoConnection');
const config = require('../util/config');

const insertPayment = async(inputToDB, inputFlag) => {
  let result = {};
  await saveDocument(inputToDB, config.MONGO_URL, config.MONGO_DB_NAME, inputFlag === 'DEUDAS' ? config.MONGO_COLLECTION_LOCHTEL : config.MONGO_COLLECTION_PAGOS_LOCHTEL)
    .then((data) => {
      result = data;
    })
    .catch((err) => {
      result = err;
    });
  return result;
};

module.exports = {
  insertPayment
};