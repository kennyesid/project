import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/styles.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="nav-main h-screen w-64 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Crud</h2>
      <nav className="flex flex-col gap-4">
        <a href="/homeWorkMain" className="hover:bg-gray-700 p-2 rounded">
          Principal
        </a>
        <a href="/users" className="hover:bg-gray-700 p-2 rounded">
          Inicio
        </a>
        <a href="/dashboard" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </a>
        <button
          onClick={handleLogout}
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Cerrar Sesión
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
