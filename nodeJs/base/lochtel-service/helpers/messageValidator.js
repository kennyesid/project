const messageType = (variable, type) => {
  return `${variable} debe ser de tipo ${type}`;
};

const messageRequired = (variable) => {
  return `${variable} es un campo requerido`;
};

module.exports = {
  messageType,
  messageRequired
};