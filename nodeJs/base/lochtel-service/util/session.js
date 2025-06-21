const { v4: uuidv4 } = require('uuid');

const addSession = (req, res, next) => {
  req['session'] = uuidv4();
  next();
};

module.exports = {
  addSession
};