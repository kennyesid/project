import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class UserService {
  static async list() {
    const token = localStorage.getItem("token");
    const url = `${REACT_APP_API_URL}/api/v1/user/all`;
    const users = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return users;
  }

  static async create(name, email, type, password) {
    const url = `${REACT_APP_API_URL}/api/v1/user/register`;
    const register = await axios.post(url, {
      name: name,
      email: email,
      type: type,
      password: password,
    });
    return register;
  }

  static async update(id, name, email, type, password) {
    console.log("joder:" + id);
    const url = `${REACT_APP_API_URL}/api/v1/user/` + id;
    console.log("joder: " + url);
    const update = await axios.put(url, {
      name: name,
      email: email,
      type: type,
      password: password,
    });
    return update;
  }

  static async delete(id) {
    const url = `${REACT_APP_API_URL}/api/v1/user/` + id;
    const update = await axios.delete(url);
    return update;
  }
}

export default UserService;
