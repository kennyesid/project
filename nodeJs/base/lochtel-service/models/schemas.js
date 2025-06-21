const { messageType, messageRequired } = require('../helpers/messageValidator');

const bodySchema = {
  type: 'object',
  properties: {
    data: { type: 'object' },
    metadata: {
      type: 'object',
      properties: {
        codUsuario: {
          type: 'string',
          errorMessage: {
            type: messageType('codUsuario', 'string')
          }
        },
        codSucursal: {
          type: 'integer',
          errorMessage: {
            type: messageType('codSucursal', 'numerico')
          }
        },
        codAplicacion: {
          type: 'integer',
          errorMessage: {
            type: messageType('codAplicacion', 'numerico')
          }
        }
      },
      errorMessage: {
        required: {
          codUsuario: messageRequired('codUsuario'),
          codSucursal: messageRequired('codSucursal'),
          codAplicacion: messageRequired('codAplicacion')
        }
      },
      required: ['codUsuario', 'codSucursal', 'codAplicacion']
    }
  },
  required: ['data', 'metadata'],
  errorMessage: {
    required: {
      data: messageRequired('data'),
      metadata: messageRequired('metadata')
    }
  }
};

module.exports = {
  bodySchema
};