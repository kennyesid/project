import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
