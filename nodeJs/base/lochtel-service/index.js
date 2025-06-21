require('dotenv').config();

const express = require('express');
const { addSession } = require('./util/session');

class Server {
  constructor() {
    this.app = express();
    this.port = 8282;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    // Lectura y parseo del body
    this.app.use(express.json());
    // session
    this.app.use(addSession);
    // Swagger documentation
  }

  routes() {
    this.app.use('/', require('./routes'));
  }
  
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });

  }
}

const server = new Server();

server.listen();