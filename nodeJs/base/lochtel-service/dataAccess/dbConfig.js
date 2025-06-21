const config = require('../util/config');

module.exports = {
  user          : config.database_user,
  password      : config.database_password,
  connectString : config.database_url
};