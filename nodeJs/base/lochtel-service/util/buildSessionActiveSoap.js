const xmlSessionActiveSoap = () => {
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
     <soapenv:Header/>
     <soapenv:Body>
        <ws:servicioEstaActivo/>
     </soapenv:Body>
  </soapenv:Envelope>`;
};

module.exports = {
  xmlSessionActiveSoap
};