const xmlSearchItemSoap = (requestInput) => {
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="ws.sintesis.com.bo">
    <soapenv:Header/>
    <soapenv:Body>
       <ws:buscarItemsDeCuenta>
          <!--Optional:-->
          <idOperativo>${requestInput.idOperativo}</idOperativo>
          <!--Optional:-->
          <codModulo>${requestInput.codModulo.codModulo}</codModulo>
          <!--Optional:-->
          <nroOperacion>${requestInput.nroOperacion}</nroOperacion>
          <!--Optional:-->
          <fechaOperativa>${requestInput.fechaOperativa}</fechaOperativa>
          <!--Optional:-->
          <cuenta>${requestInput.cuenta}</cuenta>
          <!--Optional:-->
          <servicio>${requestInput.servicio}</servicio>
       </ws:buscarItemsDeCuenta>
    </soapenv:Body>
 </soapenv:Envelope>`;
};

module.exports = {
  xmlSearchItemSoap
};