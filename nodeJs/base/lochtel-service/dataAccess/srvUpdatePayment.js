const { updateDocument } = require('./mongoConnection');
const config = require('../util/config');

const updatePayment = async(inputToDB, inputFlag) => {
  let result = {};
  await updateDocument(inputToDB, config.MONGO_URL, config.MONGO_DB_NAME, inputFlag === 'DEUDAS' ? config.MONGO_COLLECTION_LOCHTEL : config.MONGO_COLLECTION_PAGOS_LOCHTEL)
    .then((data) => {
      result = data;
    })
    .catch((err) => {
      result = err;
    });
  return result;
};

module.exports = {
  updatePayment
};