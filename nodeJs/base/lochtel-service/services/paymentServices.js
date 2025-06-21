process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { findSearchPayment } = require('../dataAccess/srvSearchPayment');
const { getLogin } = require('./loginService');
const { xmlValiPaymentSoap } = require('../util/buildValiPaymentSoap');
const { xmlPaymentSoap } = require('../util/buildPaymentSoap');
const { sendWsdl } = require('../util/sendServiceWsdl');
const { insertPayment } = require('../dataAccess/srvInsertPayment');
const { buildLogOut } = require('../models/buildLog');
const config = require('../util/config');
const constants = require('../util/constants');
const response = require('../models/response');
const errConstant = require('../util/errorConstants');
const errorConstants = require('../util/errorConstants');

const paymentService = async(req, res) => {
  let dateInit = (new Date().toISOString().slice(0, 10)).replace('-', '').replace('-', '');
  const paramDeuda = req.body.data.deuda[0].value;
  const vServiceName = 'LOCHTEL';
  const vPayNumber = req.body.data.filtro[0].value;
  let dataLogger = {
    message: vServiceName + '|pagos|' + vPayNumber + '|' + req.body.metadata.codUsuario + '|' + dateInit + '|' + paramDeuda,
    trazaMessage: '',
    deuda: paramDeuda,
    date: dateInit,
    traza: []
  };

  try {
    const responseLogin = await getLogin(req, res);
    dataLogger.traza = responseLogin.dataLogger;
    if (responseLogin.codError !== '0') {
      dataLogger.trazaMessage = responseLogin.mensaje;
      return response.error(req, res, responseLogin.codError, responseLogin.mensaje, dataLogger);
    }

    let requestDB = { deudas: { $elemMatch: { indice: paramDeuda } } };
    const getInformationDB = await findSearchPayment(requestDB, 'DEUDAS');
    const vBuildSearchPaymentOut = new buildLogOut('searchPaymentMongoDB', requestDB, getInformationDB).generate();
    dataLogger.traza.push(vBuildSearchPaymentOut);
    if (getInformationDB.codError !== '0') {
      dataLogger.trazaMessage = getInformationDB.mensaje;
      return response.error(req, res, errorConstants.codeSearchItemConnectRepositoryError, errorConstants.desSearchItemConnectRepositoryError, dataLogger);
    }

    let findPaymenToSend = [];
    for (const element of req.body.data.deuda) {
      const findPayment = getInformationDB.data[0].deudas.find(identity => identity.indice === element.value);
      if (findPayment) {
        findPaymenToSend.push(findPayment);
      }
    }

    getInformationDB.data[0].deudas = findPaymenToSend;

    let respXmlValPaySoap = xmlValiPaymentSoap(responseLogin.data, getInformationDB.data[0]);
    const responseValPaySoap = await sendWsdl(config.INTEGRATION_URI, respXmlValPaySoap, constants.soapHeader, 'validarPagoResponse');
    const vBuildValidatePaymentOut = new buildLogOut('validarPago', respXmlValPaySoap, responseValPaySoap).generate();
    dataLogger.traza.push(vBuildValidatePaymentOut);
    if (responseValPaySoap.codError !== '0') {
      if (responseValPaySoap.codError !== 'SRV999') {
        dataLogger.trazaMessage = responseValPaySoap.mensaje;
        const paramResponse = responseValPaySoap.mensaje.split(':');
        return response.error(req, res, paramResponse[0], paramResponse[1], dataLogger);
      }

      dataLogger.trazaMessage = responseValPaySoap.mensaje;
      return response.error(req, res, errConstant.codePaymentExternalError, errConstant.desPaymentExternalError, dataLogger);
    }

    let resxmlPaymentSoap = xmlPaymentSoap(responseLogin.data, getInformationDB.data[0]);
    const responsePayment = await sendWsdl(config.INTEGRATION_URI, resxmlPaymentSoap, constants.soapHeader, 'registrarPagoResponse');
    const vBuildRegisterPaymetntOut = new buildLogOut('registrarPago', resxmlPaymentSoap, responsePayment).generate();
    dataLogger.traza.push(vBuildRegisterPaymetntOut);
    if (responsePayment.codError !== '0') {
      if (responsePayment.codError !== 'SRV999') {
        dataLogger.trazaMessage = responsePayment.mensaje;
        const paramResponse = responsePayment.mensaje.split(':');
        return response.error(req, res, paramResponse[0], paramResponse[1], dataLogger);
      }
      dataLogger.trazaMessage = responsePayment.mensaje;
      return response.error(req, res, errConstant.codePaymentExternalError, errConstant.desPaymentExternalError, dataLogger);
    }

    delete getInformationDB.data[0]._id;
    const responseSaveDB = await insertPayment(getInformationDB.data[0], 'PAGOS');
    const vBuildRegisterMongoDBOut = new buildLogOut('registrarPagoMongoDB', resxmlPaymentSoap, responsePayment).generate();
    dataLogger.traza.push(vBuildRegisterMongoDBOut);
    if (responseSaveDB.codError !== '0') {
      dataLogger.trazaMessage = responseSaveDB.mensaje;
      return response.error(req, res, errorConstants.codeSearchItemRepositoryError, errorConstants.desSearchItemRepositoryError, dataLogger);
    }
    dataLogger.idPayment = responseSaveDB.data.id;

    const responseBody = () => {
      return {
        serviceId: req.body.data.serviceId,
        canal: 'BGA',
        pagos: [
          {
            pago: [
              {
                label: 'guidPago',
                value: responseSaveDB.data.id,
                mandatory: false,
                editable: 'N',
                grupo: ''
              }
            ]
          }
        ],
        impresion: {
          label: 'guidPago',
          value: responseSaveDB.data.id,
          mandatory: false,
          editable: 'N',
          grupo: ''
        },
        revertir: {
          label: 'guidPago',
          value: responseSaveDB.data.id,
          mandatory: false,
          editable: 'N',
          grupo: ''
        }
      };
    };

    return response.success(req, res, responseBody(), dataLogger);

  } catch (err) {
    dataLogger.trazaMessage = JSON.stringify(err);
    return response.error(req, res, 'SRV004', 'Error en criteriosbusquedas', dataLogger);
  }
};

module.exports = {
  paymentService
};