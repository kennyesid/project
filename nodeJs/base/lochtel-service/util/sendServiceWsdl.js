process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// import {https}  from 'https';
const axios = require('axios');
const parser = require('xml2json');

const sendWsdl = async(urlSoap, bodySoap, headerSoap, tagResponse) => {
  let result = {};

  // const instance = axios.create({
  //   httpsAgent: new https.Agent({  
  //     rejectUnauthorized: false
  //   })
  // });

  // instance.get('https://web.sintesis.com.bo/ws2.1_ws/IntegradoWSService');

  // // At request level
  //  const agent = new https.Agent({  
  //  rejectUnauthorized: false
  // });

  // await axios.post(urlSoap, bodySoap, headerSoap)
  await axios.post('https://web.sintesis.com.bo/ws2.1_ws/IntegradoWSService',
    bodySoap,
    { headers: { 'Content-Type': 'text/xml' } }
    // { httpsAgent: agent }
  )
    .then(res => {
      result = convertResponseXml(res, tagResponse);
    }).catch(err => {
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      result = {
        codError: 'SRV999',
        mensaje: JSON.stringify(err),
        data: '',
      };
    });
  return result;
};

const convertResponseXml = (resultado, tagResponse) => {
  let convertXmlSoap = JSON.parse(parser.toJson(resultado.data));
  let vTagResponse = 'ns0:' + tagResponse;
  return convertXmlSoap['S:Envelope']['S:Body'][vTagResponse]['return'];
};

module.exports = {
  sendWsdl
};
