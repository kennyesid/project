const config = require('../util/config');
const constants = require('../util/constants');
const { format, createLogger, transports } = require('winston');
require('winston-mongodb');


const logger = createLogger({
  format: format.json(),
  defaultMeta: { service: constants.service },
  transports: [
    new transports.MongoDB({
      options: {
        useUnifiedTopology: true
      },
      db: `${config.MONGO_URL}/${config.MONGO_DB_NAME}?authSource=admin`,
      collection: config.MONGO_LOG_COLLECTION,
      format: format.combine(format.json(), format.metadata())
    }),
    new transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      prettyPrint: true,
      json: true,
      format: format.combine(format.colorize())
    })
  ],
  meta: true
});

module.exports = logger;