const xmlReversionSoap = (requestInputSession, requestInputBody, requestInputDeudas) => {

  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
    <soapenv:Header/>
    <soapenv:Body>
       <ws:revertirPago>
          <!--Optional:-->
          <idOperativo>${requestInputSession.idOperativo}</idOperativo>
          <!--Optional:-->
          <nroOperacion>${requestInputBody.nroOperacion}</nroOperacion>
          <!--Optional:-->
          <fechaOperativa>${requestInputBody.fechaOperativa}</fechaOperativa>
          <!--Optional:-->
          <codModulo>${requestInputSession.codModulo.codModulo}</codModulo>
          <!--Optional:-->
          <servicio>${requestInputDeudas.servicio}</servicio>
          <!--Optional:-->
          <cuenta>${requestInputDeudas.cuenta}</cuenta>
          <!--Optional:-->
          <montoPagado>${requestInputDeudas.monto}</montoPagado>
       </ws:revertirPago>
    </soapenv:Body>
 </soapenv:Envelope>`;
};

module.exports = {
  xmlReversionSoap
};