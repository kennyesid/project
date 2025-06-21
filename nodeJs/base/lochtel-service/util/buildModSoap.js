const xmlModSoap = (requestInput) => {
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
    <soapenv:Header/>
    <soapenv:Body>
       <ws:obtenerModulos>
          <!--Optional:-->
          <idOperativo>${requestInput.idOperativo}</idOperativo>
       </ws:obtenerModulos>
    </soapenv:Body>
 </soapenv:Envelope>`;
};

module.exports = {
  xmlModSoap
};
