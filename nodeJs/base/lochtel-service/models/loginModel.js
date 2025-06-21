class ClsLogin {
  constructor(errCode, errMsg, idOperative) {
    this.errCode = errCode;
    this.errMsg = errMsg;
    this.idOperative = idOperative;
  }
}

module.exports = {
  clsLogin: ClsLogin
};