const logger = require('../dataAccess/logger');
const { buildLogOut } = require('../models/buildLog');

exports.success = function(req, res, dataInput, dataLogger) {
  let status = 200;
  let bodyResponse = {
    errCode: '',
    errMsg: '',
    data: dataInput
  };
  const vBuildModuleOut = new buildLogOut('out', req.body, bodyResponse).generate();
  dataLogger.traza.push(vBuildModuleOut);
  logger.info(dataLogger);
  res.status(status).send(bodyResponse);
};

exports.error = function(req, res, code, message, dataLogger) {
  let status = 200;
  const vBuildModuleOut = new buildLogOut('out', req.body, message).generate();
  dataLogger.traza.push(vBuildModuleOut);
  logger.error(dataLogger);
  res.status(status).send({
    errCode: code,
    errMsg: message,
    data: null
  });
};