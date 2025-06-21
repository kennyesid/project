const xmlDocumentSoap = (requestInputSession, requestInputBody) => {

  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
    <soapenv:Header/>
    <soapenv:Body>
       <ws:obtenerImpresionFE>
          <!--Optional:-->
          <idOperativo>${requestInputSession.idOperativo}</idOperativo>
          <!--Optional:-->
          <nroOperacion>${requestInputBody.nroOperacion}</nroOperacion>
          <!--Optional:-->
          <fechaOperativa>${requestInputBody.fechaOperativa}</fechaOperativa>
          <!--Optional:-->
          <codModulo>${requestInputSession.codModulo.codModulo}</codModulo>
          <!--Optional:-->
          <servicio>${requestInputBody.servicio}</servicio>
          <!--Optional:-->
          <cuenta>${requestInputBody.cuenta}</cuenta>
          <!--Optional:-->
          <tipoFormulario>G</tipoFormulario>
       </ws:obtenerImpresionFE>
    </soapenv:Body>
 </soapenv:Envelope>`;
};

module.exports = {
  xmlDocumentSoap
};