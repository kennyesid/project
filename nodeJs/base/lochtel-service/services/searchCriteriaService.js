process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { getLogin } = require('./loginService');
const { sendWsdl } = require('../util/sendServiceWsdl');
const { xmlCriteriaSoap } = require('../util/buildCriteriaSoap');
const { buildLogOut } = require('../models/buildLog');
const config = require('../util/config');
const constants = require('../util/constants');
const response = require('../models/response');
const errConstant = require('../util/errorConstants');

const buildDefaultTask = (task, req) => {
  return [{
    'etiqueta': task.etiqueta.etiqueta,
    'tipo': task.etiqueta.tipo === 'C' ? 'ALFANUMERICO' : 'LISTA',
    'requerido': true,
    'identificador': 1,
    'servicio':  config.LOCHTEL_NAME,
    'tipo_servicio': config.LOCHTEL_NAME,
    'codigo_operacion': req.body.data.type,
    'grupo': task.codCriterio,
    'orden': 1,
    'valor': '',
    'abreviatura': task.etiqueta.etiqueta.toUpperCase().includes('COMPUESTO') ? 'nroContrato' : 'nombre',
    'descripcion':  task.etiqueta.etiqueta.toUpperCase().includes('COMPUESTO') ? 'Nro de contrato compuesto' : 'nombre',
    'tamanio': 10,
    'codigo_accion': 10,
    'alias':  task.etiqueta.etiqueta.toUpperCase().includes('COMPUESTO') ? 'nroContrato' : 'nombre',
    'visible': true
  }];
};

const buildTask = (task, req) => {
  const vDep = [{ 'codigo': 'SC', 'descripcion': 'SANTA CRUZ' }, { 'codigo': 'LP', 'descripcion': 'LA PAZ' }, { 'codigo': 'CB', 'descripcion': 'COCHABAMBA' }, { 'codigo': 'OR', 'descripcion': 'ORURO' }, { 'codigo': 'TJ', 'descripcion': 'TARIJA' }, { 'codigo': 'BE', 'descripcion': 'BENI' }, { 'codigo': 'CH', 'descripcion': 'CHUQUISACA' }, { 'codigo': 'PO', 'descripcion': 'POTOSI' }, { 'codigo': 'PA', 'descripcion': 'PANDO' }];
  return task.etiqueta.map(function(item, index2) {
    return {
      'etiqueta': item.etiqueta,
      'tipo': item.tipo.includes('C') ? 'ALFANUMERICO' : 'LISTA',
      'requerido': true,
      'identificador': index2 + 1,
      'servicio': config.LOCHTEL_NAME,
      'tipo_servicio':  config.LOCHTEL_NAME,
      'codigo_operacion': req.body.data.type,
      'grupo': item.codCriterio,
      'orden': index2 + 1,
      'valor': item.etiqueta.toUpperCase().includes('EXTENSION') ? vDep : '',
      'abreviatura': item.etiqueta.toUpperCase().includes('EXTENSION') ? 'ext' : 'nroDoc',
      'descripcion': item.etiqueta.toUpperCase().includes('EXTENSION') ? 'Extension del documento' : 'Nro de documento de identidad',
      'tamanio': 10,
      'codigo_accion': 10,
      'alias': item.etiqueta.toUpperCase().includes('EXTENSION') ? 'ext' : 'nroDoc',
      'visible': true
    };
  });
};

const buildTasks = (vBuildResponse, req) => {
  return vBuildResponse.map((task) => {
    return {
      'grupo': task.codCriterio,
      'descripcion': task.descripcion,
      'campos': task.etiqueta.length > 0
        ? buildTask(task, req)
        : buildDefaultTask(task, req)
    };
  });
};

const getCriteriaService = async(req, res) => {
  let dateInit = (new Date().toISOString().slice(0, 10)).replace('-', '').replace('-', '');
  const vServiceId = req.body.data.serviceId;
  const vServiceName = 'LOCHTEL';
  await new Promise(resolve => setTimeout(resolve, 35000));
  let dataLogger = {
    message: vServiceName + '|criteriosbusquedas' + '|' + req.body.metadata.codUsuario + '|' + dateInit + '|' + vServiceId,
    isSession: req.session,
    trazaMessage: '',
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

    let bodyCriteria = xmlCriteriaSoap(responseLogin.data);
    const responseModule = await sendWsdl(config.INTEGRATION_URI, bodyCriteria, constants.soapHeader, 'obtenerCriteriosParaModuloResponse');
    const vBuildModuleOut = new buildLogOut('obtenerCriteriosParaModulo', bodyCriteria, responseModule).generate();
    dataLogger.traza.push(vBuildModuleOut);
    if (responseModule.codError !== '0') {
      if (responseModule.codError !== 'SRV999') {
        dataLogger.trazaMessage = responseModule.mensaje;
        const paramResponse = responseModule.mensaje.split(':');
        return response.error(req, res, paramResponse[0], paramResponse[1], dataLogger);
      }
      dataLogger.trazaMessage = responseModule.mensaje;
      return response.error(req, res, errConstant.codeNotExternalModuleError, errConstant.desNotExternalModuleError, dataLogger);
    }

    const vBuildResponse = responseModule.criterio;
    const task_names = buildTasks(vBuildResponse, req);

    return response.success(req, res, { serviceId: req.body.data.serviceId, criterios: task_names }, dataLogger);
  } catch (err) {
    dataLogger.trazaMessage = JSON.stringify(err);
    return response.error(req, res, 'SRV001', 'Error en criteriosbusquedas', dataLogger);
  }
};

module.exports = {
  getCriteriaService
};
