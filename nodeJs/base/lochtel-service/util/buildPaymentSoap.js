const xmlPaymentSoap = (requestInputSession, requestInputBody) => {

  let functionGetItems = function(input) {
    let items = '';
    for (const element of input) {
      items = items + `<items> <monto>${element.monto}</monto> <nroItem>${element.idDependencia}</nroItem> </items>`;
    }
    return items;
  };
  let getItems = functionGetItems(requestInputBody.deudas);

  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
    <soapenv:Header/>
    <soapenv:Body>
       <ws:registrarPago>
          <!--Optional:-->
          <idOperativo>${requestInputSession.idOperativo}</idOperativo>
          <!--Optional:-->
          <nroOperacion>${requestInputBody.nroOperacion}</nroOperacion>
          <!--Optional:-->
          <fechaOperativa>${requestInputBody.fechaOperativa}</fechaOperativa>
          <!--Optional:-->
          <codModulo>${requestInputSession.codModulo.codModulo}</codModulo>
          <!--Optional:-->
          <cuenta>${requestInputBody.cuenta}</cuenta>
          <!--Optional:-->
          <servicio>${requestInputBody.servicio}</servicio>
          <!--Optional:-->
          <nombreFac>${requestInputBody.nombreNit}</nombreFac>
          <!--Optional:-->
          <nitFac>${requestInputBody.nit}</nitFac>
          <!--Optional:-->
          <direcEnvio></direcEnvio>
          <!--Zero or more repetitions:-->
          ${getItems}
       </ws:registrarPago>
    </soapenv:Body>
 </soapenv:Envelope>`;
};
// <nombreFac>${requestInputBody.nombre}</nombreFac>
module.exports = {
  xmlPaymentSoap
};