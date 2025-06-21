let chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);

const url = 'http://localhost:8080';
const serviceId = 637;
let vIdentificadorDeuda = '';
let vIdentificadorPago = '';

const validateResponse = (res, done) => {
  expect(res).to.have.status(200);
  expect(res.body.errCode).to.equal('');
  done();
};

describe('Unit Testing criteriosbusquedas: ', () => {

  it('should respond successfully - criteriosbusquedas', (done) => {
    chai.request(url)
      .post('/api/v1/criteriosbusquedas')
      .send({
        data: {
          serviceId: serviceId,
          type: 'B'
        },
        metadata: {
          codUsuario: 'JBK',
          codSucursal: 70,
          codAplicacion: 1
        }
      })
      .end(function(_err, result) {
        validateResponse(result, done);
      });
  });
});

describe('Unit Testing clientes: ', () => {

  it('should respond successfully - clientes', (done) => {
    chai.request(url)
      .post('/api/v1/clientes')
      .send({
        'data': {
          'serviceId': serviceId,
          'filtro': [
            {
              'identificador': 3,
              'alias': 'nroContrato',
              'valor': '12455-1'
            }
          ]
        },
        'metadata': {
          'codUsuario': 'TOP1',
          'codSucursal': 70,
          'codAplicacion': 1
        }
      })
      .end(function(_err, response) {
        validateResponse(response, done);
      });
  });
});

describe('Unit Testing deudas: ', () => {

  it('should respond successfully - deuda', (done) => {
    chai.request(url)
      .post('/api/v1/deudas')
      .send({
        'data': {
          'serviceId': serviceId,
          'filtro': [
            {
              'label': 'codigo',
              'value': '579-1',
              'mandatory': true,
              'editable': 'N',
              'description': 'nombre',
              'code': 'nombre'
            }
          ]
        },
        'metadata': {
          'codUsuario': 'JBK',
          'codSucursal': 70,
          'codAplicacion': 1
        }
      })
      .end(function(_err, resp) {
        if (_err === null) {
          vIdentificadorDeuda = JSON.stringify(resp.body.data.deudas[0].deuda[22].value);
        }
        validateResponse(resp, done);
      });
  });
});

describe('Unit Testing pagos: ', () => {

  it('should respond successfully - pagos', (done) => {
    chai.request(url)
      .post('/api/v1/pagos')
      .send({
        'data': {
          'serviceId': serviceId,
          'filtro': [
            {
              'label': 'idOperativo',
              'value': '8815',
              'mandatory': true,
              'editable': 'N',
              'grupo': 'filtro',
              'code': 'idSesionExterno',
              'tipoDato': 'N'
            },
            {
              'label': 'nroOperacion',
              'value': '8815',
              'mandatory': true,
              'editable': 'N',
              'grupo': 'filtro',
              'code': 'nroOperacion',
              'tipoDato': 'N'
            },
            {
              'label': 'fechaOperativa',
              'value': '8815',
              'mandatory': true,
              'editable': 'N',
              'grupo': 'filtro',
              'code': 'fechaOperativa',
              'tipoDato': 'C'
            },
            {
              'label': 'cuenta',
              'value': '8815',
              'mandatory': true,
              'editable': 'N',
              'grupo': 'filtro',
              'code': 'cuenta',
              'tipoDato': 'C'
            },
            {
              'label': 'servicio',
              'value': '141',
              'mandatory': true,
              'editable': 'N',
              'grupo': 'filtro',
              'code': 'servicio',
              'tipoDato': 'N'
            },
            {
              'label': 'nit',
              'value': '0',
              'mandatory': true,
              'editable': 'N',
              'grupo': 'filtro',
              'code': 'nit',
              'tipoDato': 'N'
            },
            {
              'label': 'razonSocial',
              'value': '0',
              'mandatory': true,
              'editable': 'N',
              'grupo': 'filtro',
              'code': 'razonSocial',
              'tipoDato': 'C'
            },
            {
              'label': 'direcEnvio',
              'value': '141',
              'mandatory': true,
              'editable': 'N',
              'grupo': 'filtro',
              'code': 'direcEnvio',
              'tipoDato': 'C'
            },
            {
              'label': 'complemento',
              'value': '0',
              'mandatory': false,
              'editable': 'N',
              'grupo': '',
              'code': 'complemento',
              'tipoDato': 'C'
            }
          ],
          'deuda': [
            {
              'label': 'indice',
              'value': vIdentificadorDeuda.replace('"', '').replace('"', ''),
              'mandatory': true,
              'editable': 'N',
              'grupo': 'deuda',
              'code': 'indice',
              'tipoDato': 'G'
            }
          ]
        },
        'metadata': {
          'codUsuario': 'TOP1',
          'codSucursal': 701,
          'codAplicacion': 1
        }
      })
      .end(function(_err, res) {
        if (_err === null) {
          vIdentificadorPago = JSON.stringify(res.body.data.pagos[0].pago[0].value);
        }
        validateResponse(res, done);
      });
  });
});

describe('Unit Testing documentos: ', () => {

  it('should respond successfully - documentos', (done) => {
    chai.request(url)
      .post('/api/v1/documentos')
      .send({
        'data': {
          'serviceId': serviceId,
          'impresion': {
            'label': 'guidPago ',
            'value': vIdentificadorPago.replace('"', '').replace('"', ''),
            'mandatory': false,
            'editable': 'N',
            'grupo': ''
          }
        },
        'metadata': {
          'codUsuario': 'JBK',
          'codSucursal': 70,
          'codAplicacion': 1
        }
      })
      .end(function(_err, resu) {
        validateResponse(resu, done);
      });
  });
});

describe('Unit Testing revertir: ', () => {

  it('should respond successfully - revertir', (done) => {
    chai.request(url)
      .post('/api/v1/revertir')
      .send({
        'data': {
          'serviceId': serviceId,
          'revertir': {
            'label': 'guidPago',
            'value': vIdentificadorPago.replace('"', '').replace('"', ''),
            'mandatory': false,
            'editable': 'N',
            'grupo': ''
          }
        },
        'metadata': {
          'codUsuario': 'JBK',
          'codSucursal': 70,
          'codAplicacion': 1
        }
      })
      .end(function(_err, resl) {
        validateResponse(resl, done);
      });
  });
});



