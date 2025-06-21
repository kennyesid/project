const xmlCustomerSoap = (requestInput, requestBody, searchCriteria) => {
  const nroContrato = requestBody.find(x => x.alias === 'nroContrato')?.valor;
  const nroDoc = requestBody.find(x => x.alias === 'nroDoc')?.valor;
  const ext = requestBody.find(x => x.alias === 'ext')?.valor;
  let filtro = '';
  if (!nroContrato) {
    filtro = `<codigo>${nroDoc}</codigo><codigo>${ext}</codigo><codigo/>`;
  } else {
    filtro = `<codigo/><codigo/><codigo>${nroContrato}</codigo>`;
  }
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
    <soapenv:Header/>
    <soapenv:Body>
       <ws:buscarCliente>
          <!--Optional:-->
          <idOperativo>${requestInput.idOperativo}</idOperativo>
          <!--Optional:-->
          <codModulo>${requestInput.codModulo.codModulo}</codModulo>
          <!--Optional:-->
          <codCriterio>${searchCriteria}</codCriterio>
          <!--Zero or more repetitions:-->
          ${filtro}
       </ws:buscarCliente>
    </soapenv:Body>
 </soapenv:Envelope>`;
};

module.exports = {
  xmlCustomerSoap
};