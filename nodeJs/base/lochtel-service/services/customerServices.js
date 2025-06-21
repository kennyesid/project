process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { getLogin } = require('./loginService');
const { xmlCustomerSoap } = require('../util/buildCustomerSoap');
const { sendWsdl } = require('../util/sendServiceWsdl');
const { buildLogOut } = require('../models/buildLog');
const config = require('../util/config');
const constants = require('../util/constants');
const response = require('../models/response');
const errConstant = require('../util/errorConstants');

const listCustomer = (customer) => {
  let setforeach = [];
  if (!Array.isArray(customer)) {
    setforeach.push(customer);
  } else {
    setforeach = customer;
  }

  const labelCustomer = 'cliente';
  const labelAddress = 'direccion';
  const labelContractNumber = 'nroContrato';
  const labelReferenceNumber = 'nroReferencia';
  const labelDescription = 'descripcion';
  const labelService = 'servicio';
  const labelCurrency = 'moneda';

  let objectCustomer = [];
  for (const element of setforeach) {
    let listCustomers = [];
    listCustomers.push({ label: labelCustomer, value: element.nombre, mandatory: false, editable: 'N', description: labelCustomer, code: labelCustomer });
    listCustomers.push({ label: labelAddress, value: element.detalle, mandatory: false, editable: 'N', description: 'Dirección', code: labelAddress });
    listCustomers.push({ label: labelContractNumber, value: element.cuenta, mandatory: true, editable: 'N', description: 'Codigo de contrato', code: labelContractNumber });
    listCustomers.push({ label: labelReferenceNumber, value: element.cuenta, mandatory: false, editable: 'N', description: 'Nro De Contrato Asociado', code: labelReferenceNumber });
    listCustomers.push({ label: labelDescription, value: element.descServicio, mandatory: false, editable: 'N', description: 'descripcion del servicio', code: labelDescription });
    listCustomers.push({ label: labelService, value: element.servicio, mandatory: false, editable: 'N', description: labelService, code: labelService });
    listCustomers.push({ label: labelCurrency, value: element.moneda, mandatory: false, editable: 'N', description: labelCurrency, code: labelCurrency });
    objectCustomer.push({ cliente: listCustomers });
  }

  return objectCustomer;
};

exports.getCustomer = async(req, res) => {
  let dateInit = (new Date().toISOString().slice(0, 10)).replace('-', '').replace('-', '');
  const vServiceName = 'LOCHTEL';
  let dataLogger = {
    trak: req.body.metadata.codUsuario + dateInit + req.body.data.serviceId + req.body.data.filtro[0].identificador + req.body.data.filtro[0].valor,
    message: vServiceName + '|clientes' + '|' + req.body.metadata.codUsuario + '|' + dateInit + '|' + req.body.data.filtro[0].valor,
    isSession: req.session,
    trazaMessage: '',
    date: dateInit,
    identificador: req.body.data.filtro[0].identificador,
    value: req.body.data.filtro[0].valor,
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
    const vBuildCustomerOut = new buildLogOut('buscarCliente', xmlBodyCustomer, responseCustomer).generate();
    dataLogger.traza.push(vBuildCustomerOut);
    if (responseCustomer.codError !== '0') {
      if (responseCustomer.codError !== 'SRV999') {
        dataLogger.trazaMessage = responseCustomer.mensaje;
        const paramResponse = responseCustomer.mensaje.split(':');
        return response.error(req, res, paramResponse[0], paramResponse[1], dataLogger);
      }

      dataLogger.trazaMessage = responseCustomer.mensaje;
      return response.error(req, res, errConstant.codeCustomerNotFoundError, errConstant.desCustomerNotFoundError, dataLogger);
    }

    const putCustomer = listCustomer(responseCustomer.cuenta);
    return response.success(req, res, { serviceId: req.body.data.serviceId, clientes: putCustomer }, dataLogger);

  } catch (err) {
    dataLogger.trazaMessage = JSON.stringify(err);
    return response.error(req, res, errConstant.codeSearchCriteriaError, errConstant.desSearchCriteriaError, dataLogger);
  }
};