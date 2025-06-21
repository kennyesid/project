process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { xmlLoginSoap } = require('../util/buildLoginSoap');
const { sendWsdl } = require('../util/sendServiceWsdl');
const { xmlModSoap } = require('../util/buildModSoap');
const { buildLogOut } = require('../models/buildLog');
const { xmlSessionActiveSoap } = require('../util/buildSessionActiveSoap');
const errConstant = require('../util/errorConstants');
const config = require('../util/config');
const constants = require('../util/constants');

const getLogin = async() => {

  let vObjectLog = [];
  try {
    let xmlServiceActive = xmlSessionActiveSoap();
    const responseServiceActive = await sendWsdl(config.INTEGRATION_URI, xmlServiceActive, constants.soapHeader, 'servicioEstaActivoResponse');
    const vServiceActive = new buildLogOut('servicioEstaActivo', xmlServiceActive, responseServiceActive).generate();
    vObjectLog.push(vServiceActive);
    if (responseServiceActive.codError !== '0') {
      return { codError: errConstant.codeServiceActiveError, mensaje: errConstant.desServiceActiveError, dataLogger: vObjectLog };
    }

    let body = xmlLoginSoap();
    const responseSession = await sendWsdl(config.INTEGRATION_URI, body, constants.soapHeader, 'iniciarSesionResponse');
    const vBuildLogOut = new buildLogOut('iniciarSesion', body, responseSession).generate();
    vObjectLog.push(vBuildLogOut);

    if (responseSession.codError !== '0') {
      return { codError: errConstant.codeNotFoundIdentityError, mensaje: errConstant.desNotFoundIdentityError, dataLogger: vObjectLog };
    }

    let bodyModule = xmlModSoap(responseSession);
    const responseModule = await sendWsdl(config.INTEGRATION_URI, bodyModule, constants.soapHeader, 'obtenerModulosResponse');
    const vBuildModuleOut = new buildLogOut('obtenerModulos', bodyModule, responseModule).generate();
    vObjectLog.push(vBuildModuleOut);
    if (responseModule.codError !== '0') {
      return { codError: errConstant.codeNotExternalModuleError, mensaje: errConstant.desNotExternalModuleError, dataLogger: vObjectLog };
    }

    const getModule = function() {
      return 141;
    };

    return {
      codError: '0',
      mensaje: '',
      data: {
        idOperativo: responseSession.idOperativo,
        codModulo: responseModule.modulo.find(w => w.codModulo.includes(getModule()))
      },
      dataLogger: vObjectLog
    };
  } catch (ex) {
    return {
      codError: '1',
      mensaje: JSON.stringify(ex),
      data: '',
      dataLogger: vObjectLog
    };
  }
};

module.exports = {
  getLogin
};