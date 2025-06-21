const config = require('../util/config');

const xmlLoginSoap = () => {
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
    <soapenv:Header/>
        <soapenv:Body>
            <ws:iniciarSesion>
                <usuario>${config.LOCHTEL_USER}</usuario>
                <password>${config.LOCHTEL_PASSWORD}</password>
                <origenTransaccion>${config.LOCHTEL_ORIGEN_TRANSACCION}</origenTransaccion>
            </ws:iniciarSesion>
        </soapenv:Body>
    </soapenv:Envelope>`;
};

module.exports = {
  xmlLoginSoap
};