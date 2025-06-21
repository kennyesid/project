const { getLogin } = require('./loginService');
const { xmlCustomerSoap } = require('../util/buildCustomerSoap');
const { sendWsdl } = require('../util/sendServiceWsdl');
const { xmlSearchItemSoap } = require('../util/buildSearchItemSoap');
const { v4: uuidv4 } = require('uuid');
const { listDebt } = require('../util/utilSearchItem');
const { insertPayment } = require('../dataAccess/srvInsertPayment');
const { buildLogOut } = require('../models/buildLog');
const config = require('../util/config');
const constants = require('../util/constants');
const response = require('../models/response');
const errConstant = require('../util/errorConstants');


const getDate = (request) => {
  const vSplitLineMiddle = request.split('-');
  let vSplitSpace = vSplitLineMiddle[0].trim().split(' ');
  vSplitSpace[0] = ('EneFebMarAbrMayJunJulAgoSepOctNovDic'.indexOf(vSplitSpace[0]) / 3 + 1);
  vSplitSpace[0] = vSplitSpace[0].lenth > 1 ? vSplitSpace[0].toString() : '0' + vSplitSpace[0].toString();
  return vSplitSpace;
};

exports.searchDeuda = async(req, res) => {

  let dateInit = (new Date().toISOString().slice(0, 10)).replace('-', '').replace('-', '');
  const vServiceId = req.body.data.serviceId;
  const vServiceName = 'LOCHTEL' ;
  let dataLogger = {
    message: vServiceName + '|deudas' + '|' + req.body.metadata.codUsuario + '|' + dateInit + '|' + req.body.data.filtro[0].value + '|' + vServiceId,
    isSession: req.session,
    trazaMessage: '',
    date: dateInit,
    value: req.body.data.filtro[0].value,
    code: req.body.data.filtro[0].code,
    traza: []
  };

  try {
    const responseLogin = await getLogin(req, res);
    dataLogger.traza = responseLogin.dataLogger;
    if (responseLogin.codError !== '0') {
      dataLogger.trazaMessage = responseLogin.mensaje;
      return response.error(req, res, responseLogin.codError, responseLogin.mensaje, dataLogger);
    }
    let xmlBodyCustomer = xmlCustomerSoap(responseLogin.data, req.body.data.filtro, req.body.data.criterio);
    const responseCustomer = await sendWsdl(config.INTEGRATION_URI, xmlBodyCustomer, constants.soapHeader, 'buscarClienteResponse');
    const vBuildModuleOut = new buildLogOut('buscarCliente', xmlBodyCustomer, responseCustomer).generate();
    dataLogger.traza.push(vBuildModuleOut);
    if (responseCustomer.codError !== '0') {
      if (responseCustomer.codError !== 'SRV999') {
        dataLogger.trazaMessage = responseCustomer.mensaje;
        const paramResponse = responseCustomer.mensaje.split(':');
        return response.error(req, res, paramResponse[0], paramResponse[1], dataLogger);
      }
      dataLogger.trazaMessage = responseCustomer.mensaje;
      return response.error(req, res, errConstant.codeCustomerNotFoundError, errConstant.desCustomerNotFoundError, dataLogger);
    }

    const getFilter = {
      nroOperacion: responseCustomer.nroOperacion,
      fechaOperativa: responseCustomer.fechaOperativa,
      cuenta: responseCustomer.cuenta.cuenta,
      servicio: responseCustomer.cuenta.servicio
    };

    const getParameter = Object.assign(responseLogin.data, getFilter);
    const xmlSearchItem = xmlSearchItemSoap(getParameter);
    const responseSearchItem = await sendWsdl(config.INTEGRATION_URI, xmlSearchItem, constants.soapHeader, 'buscarItemsDeCuentaResponse');
    const vBuildSearchItemAccountOut = new buildLogOut('buscarItemsDeCuenta', xmlSearchItem, responseSearchItem).generate();
    dataLogger.traza.push(vBuildSearchItemAccountOut);
    if (responseSearchItem.codError !== '0') {
      dataLogger.trazaMessage = responseSearchItem.mensaje;
      return response.error(req, res, errConstant.codeSearchItemNotFoundError, errConstant.desSearchItemNotFoundError, dataLogger);
    }

    const vVariable = (item) => {
      let setValue = [];
      if (!Array.isArray(item.item)) {
        setValue.push(item.item);
        item.item = setValue;
      }
      const countArray = item.item.length;
      let getArray = [];
      for (let i = 0; i < countArray; i++) {
        let vObject = {
          indice: uuidv4(),
          gestion: '0',
          moneda: item.item[i].moneda === 'Bs' ? '0' : '2225',
          monto: item.item[i].monto,
          idDependencia: item.item[i].nroItem,
          descItem: item.item[i].descItem,
          mesPeriodo:  getDate(item.item[i].descItem)[0],
          idOperativo: responseLogin.data.idOperativo,
          nroOperacion: responseCustomer.nroOperacion,
          fechaOperativa: responseCustomer.fechaOperativa,
          cuenta: responseCustomer.cuenta.cuenta,
          servicio: responseCustomer.cuenta.servicio,
          nombre: responseCustomer.cuenta.nombre,
          modificaNit: 'S',
          numeroNit: item.nitFac,
          anioPeriodo: getDate(item.item[i].descItem)[1],
        };
        getArray.push(vObject);
      }
      return getArray;
    };

    const vItems = vVariable(responseSearchItem);

    const vListDebt = await listDebt(vItems);
    const objectSaveDB = {
      nombre: responseCustomer.cuenta.nombre,
      nroOperacion: responseCustomer.nroOperacion,
      fechaOperativa: responseCustomer.fechaOperativa,
      cuenta: responseCustomer.cuenta.cuenta,
      servicio: responseCustomer.cuenta.servicio,
      isReversion: false,
      nombreNit: responseSearchItem.nombreFac,
      nit: responseSearchItem.nitFac,
      deudas: vItems
    };
    const responseSaveDB = await insertPayment(objectSaveDB, 'DEUDAS');
    const vBuildSaveDataOut = new buildLogOut('saveDataMongoDB', objectSaveDB, responseSaveDB).generate();
    dataLogger.traza.push(vBuildSaveDataOut);
    if (responseSaveDB.codError !== '0') {
      dataLogger.trazaMessage = responseSaveDB.mensaje;
      return response.error(req, res, errConstant.codeSearchItemRepositoryError, errConstant.desSearchItemRepositoryError);
    }

    return response.success(req, res, { serviceId: req.body.data.serviceId, deudas: vListDebt }, dataLogger);
  } catch (err) {
    dataLogger.trazaMessage = JSON.stringify(err);
    return response.error(req, res, 'SRV003', 'Error en criteriosbusquedas', dataLogger);
  }
};
