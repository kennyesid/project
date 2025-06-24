import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import SignService from "../services/SignService";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [googleLogin, setGoogleLogin] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    // await SignService.login(email, password)
    //   .then((res) => {
    //     if (res.status) {
    //       localStorage.setItem("isAuthenticated", "true");
    //       localStorage.setItem("token", res.data.data.token);
    //       navigate("/users");
    //     } else {
    //       setError("Credenciales inválidas");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Error al obtener los usuarios:", err);
    //     alert(err.response.data.message);
    //   });
  };

  const onSuccess = (response) => {
    debugger;
    console.log("respuesta: " + JSON.stringify(response));
    setGoogleLogin(response);
  };

  const onFail = (response) => {
    debugger;
    console.log("fail_response: " + JSON.stringify(response));
  };

  const loadGoogleAuth = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id:
            "T573653968259-d9ipqu7iajh74n81im41pa485b1rulps.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
          scope: "profile email",
        })
        .then(
          (auth2) => console.log("Google Auth inicializado", auth2),
          (error) => console.error("Error al inicializar Google Auth", error)
        );
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.onload = loadGoogleAuth;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-image flex justify-center items-center h-screen bg-gray-100 relative">
      <button
        className="absolute text-1x1 font-bold top-20 right-20 bg-white txt-main p-2 rounded"
        onClick={() => navigate("/")}
      >
        Iniciar Sesion
      </button>

      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleLogin}
      >
        <h1 className="txt-main text-4xl font-bold mb-4 text-center">
          Crear Cuenta
        </h1>
        <h1 className="txt-main text-1xl font-bold mb-4 text-center">
          Iniciar Sesión
        </h1>
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
        <GoogleOAuthProvider clientId="573653968259-d9ipqu7iajh74n81im41pa485b1rulps.apps.googleusercontent.com">
          <GoogleLogin onSuccess={onSuccess} onError={onFail} />
        </GoogleOAuthProvider>
        <div className="h-2"></div>
        <button className="btn-main w-full text-white p-2 rounded btn-main:hover">
          Aceptar
        </button>
      </form>
    </div>
  );
}

export default Register;
