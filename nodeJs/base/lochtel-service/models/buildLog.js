class BuildLogOut {
  constructor(name, request, response) {
    this.name = name;
    this.request = request;
    this.response = response;
  }
  generate() {
    return {
      service: this.name,
      request: this.request,
      response: this.response
    };
  }
}

module.exports = {
  buildLogOut: BuildLogOut
};