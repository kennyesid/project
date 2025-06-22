import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignService from "../services/SignService";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await SignService.login(email, password)
      .then((res) => {
        if (res.status) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("token", res.data.data.token);
          navigate("/users");
        } else {
          setError("Credenciales inválidas");
        }
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
        alert(err.response.data.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default SignIn;
