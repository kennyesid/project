process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { findSearchPayment } = require('../dataAccess/srvSearchPayment');
const { xmlDocumentSoap } = require('../util/buildDocumentSoap');
const { buildLogOut } = require('../models/buildLog');
const { getLogin } = require('./loginService');
const { sendWsdl } = require('../util/sendServiceWsdl');
const config = require('../util/config');
const constants = require('../util/constants');
const response = require('../models/response');
const errConstant = require('../util/errorConstants');

const mongo = require('mongodb');

const documentService = async(req, res) => {
  let dateInit = (new Date().toISOString().slice(0, 10)).replace('-', '').replace('-', '');
  const idPago = req.body.data.impresion.value;
  const vServiceId = req.body.data.serviceId;
  const vServiceName = 'LOCHTEL';
  let dataLogger = {
    message: vServiceName + '|documentos' + '|' + vServiceId + '|' + req.body.metadata.codUsuario + '|' + dateInit + '|' + idPago,
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
    const vBuildGetInformationOut = new buildLogOut('getInformationMongoDB', idPago, getInformationDB).generate();
    dataLogger.traza.push(vBuildGetInformationOut);
    if (getInformationDB.codError !== '0') {
      dataLogger.trazaMessage = getInformationDB.mensaje;
      return response.error(req, res, errConstant.codeDocumentError, errConstant.desDocumentError, dataLogger);
    }
    const getXmlDocument = xmlDocumentSoap(responseLogin.data, getInformationDB.data[0]);
    const responseReversion = await sendWsdl(config.INTEGRATION_URI, getXmlDocument, constants.soapHeader, 'obtenerImpresionFEResponse');
    const vBuildGetDocumentOut = new buildLogOut('obtenerImpresionFER', getXmlDocument, responseReversion).generate();
    dataLogger.traza.push(vBuildGetDocumentOut);
    if (responseReversion.codError !== '0') {
      if (responseReversion.codError !== 'SRV999') {
        dataLogger.trazaMessage = responseReversion.mensaje;
        const paramResponse = responseReversion.mensaje.split(':');
        return response.error(req, res, paramResponse[0], paramResponse[1], dataLogger);
      }

      dataLogger.trazaMessage = responseReversion.mensaje;
      return response.error(req, res, errConstant.codeDocumentExternalError, errConstant.desDocumentExternalError, dataLogger);
    }
    const valueBase64 = req.body.data.impresion.value ;
    const responseBody = {
      'serviceId': req.body.data.serviceId,
      'canal': 'BGA',
      'impresiones': [
        {
          'impresion': [
            {
              'label': 'base64',
              'value': valueBase64,
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
    return response.error(req, res, 'SRV005', 'Error en criteriosbusquedas', dataLogger);
  }
};

module.exports = {
  documentService
};