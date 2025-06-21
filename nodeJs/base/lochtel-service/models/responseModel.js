class ClsResponse {
  constructor(errState, errMsg, data = '') {
    this.errState = errState;
    this.errMsg = errMsg;
    this.data = data;
  }
}

module.exports = {
  clsResponse: ClsResponse
};