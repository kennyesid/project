process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { findSearchPayment } = require('../dataAccess/srvSearchPayment');
const { xmlReversionSoap } = require('../util/buildRevertSoap');
const { buildLogOut } = require('../models/buildLog');
const { getLogin } = require('./loginService');
const { sendWsdl } = require('../util/sendServiceWsdl');
const config = require('../util/config');
const constants = require('../util/constants');
const response = require('../models/response');
const errConstant = require('../util/errorConstants');
const mongo = require('mongodb');

const reversionService = async(req, res) => {
  let dateInit = (new Date().toISOString().slice(0, 10)).replace('-', '').replace('-', '');
  const idPago = req.body.data.revertir.value;
  const vServiceName = 'LOCHTEL';
  let dataLogger = {
    message: vServiceName + '|revertir' + '|' + req.body.metadata.codUsuario + '|' + dateInit + '|' + idPago,
    isSession: req.session,
    trazaMessage: '',
    idPayment: idPago,
    traza: []
  };

  try {
    const responseLogin = await getLogin(req, res);
    dataLogger.traza = responseLogin.dataLogger;
    if (responseLogin.codError !== '0') {
      dataLogger.trazaMessage = responseLogin.mensaje;
      return response.error(req, res, responseLogin.codError, responseLogin.mensaje, dataLogger);
    }

    const getInformationDB = await findSearchPayment({ '_id': new mongo.ObjectID(idPago) }, 'PAGOS');
    const vBuildInformationOut = new buildLogOut('getInformationMongoDB', idPago, getInformationDB).generate();
    dataLogger.traza.push(vBuildInformationOut);
    if (getInformationDB.codError !== '0') {
      dataLogger.trazaMessage = getInformationDB.mensaje;
      return response.error(req, res, errConstant.codeReverseError, errConstant.desReverseError, dataLogger);
    }

    for (const element of getInformationDB.data[0].deudas) {
      const getXmlReversion = xmlReversionSoap(responseLogin.data, getInformationDB.data[0], element);
      const responseReversion = await sendWsdl(config.INTEGRATION_URI, getXmlReversion, constants.soapHeader, 'revertirPagoResponse');
      const vGetInformationDBOut = new buildLogOut('revertirPago', getXmlReversion, responseReversion).generate();
      dataLogger.traza.push(vGetInformationDBOut);
      if (responseReversion.codError !== '0') {
        dataLogger.trazaMessage = responseReversion.mensaje;
        if (responseReversion.mensaje.includes('revertida')) {
          const vSplit = responseReversion.mensaje.split(':');
          return response.error(req, res, vSplit[0].toString(), vSplit[1].toString(), dataLogger);
        }

        return response.error(req, res, errConstant.codeReverseExternalError, errConstant.desReverseExternalError, dataLogger);
      }
    }

    const responseBody = {
      'serviceId': req.body.data.serviceId,
      'canal': 'BGA',
      'reversionPagos': [
        {
          'reversionPago': [
            {
              'label': 'base64',
              'value': idPago,
              'mandatory': false,
              'editable': 'N',
              'grupo': ''
            }
          ]
        }
      ]
    };

    return response.success(req, res, responseBody, dataLogger);
  } catch (err) {
    dataLogger.trazaMessage = JSON.stringify(err);
    return response.error(req, res, 'SRV006', 'Error en criteriosbusquedas', dataLogger);
  }
};

module.exports = {
  reversionService
};