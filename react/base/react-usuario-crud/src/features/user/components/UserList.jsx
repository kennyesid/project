import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="row">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Usuarios</h2>
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th
                className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                style={{ display: "none" }}
              >
                id
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nombre
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Correo
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Rol
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2" style={{ display: "none" }}>
                  {user._id}
                </td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.type}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => onEdit(user)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
