const xmlCriteriaSoap = (requestInput) => {
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
    <soapenv:Header/>
    <soapenv:Body>
       <ws:obtenerCriteriosParaModulo>
          <!--Optional:-->
          <idOperativo>${requestInput.idOperativo}</idOperativo>
          <!--Optional:-->
          <codModulo>${requestInput.codModulo.codModulo}</codModulo>
       </ws:obtenerCriteriosParaModulo>
    </soapenv:Body>
 </soapenv:Envelope>`;
};

const getCriterioForService = (serviceId) => {
  const searchCriteria = {
    '637': 1, '682': 2, '683': 3
  };
  return searchCriteria[serviceId];
};

module.exports = {
  xmlCriteriaSoap,
  getCriterioForService
};