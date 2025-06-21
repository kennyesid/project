const xmlCriteriaModule = () => {
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
    <soapenv:Header/>
        <soapenv:Body>
            <ws:obtenerCriteriosParaModulo>
                <idOperativo>-1591321407202204070035</idOperativo>
                <codModulo>141</codModulo>
            </ws:obtenerCriteriosParaModulo>
        </soapenv:Body>
    </soapenv:Envelope>`;
};

module.exports = {
  xmlCriteriaModule
};