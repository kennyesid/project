import axios from "axios";
//const axios = require("axios");

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class SignService {
  static async login(email, password) {
    const url = `${REACT_APP_API_URL}/api/v1/user/login`;
    const users = await axios.post(url, {
      email,
      password,
    });
    return users;
  }
}

export default SignService;
