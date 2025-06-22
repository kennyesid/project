import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import Modal from "../../../components/common/ModalPopup";
import UserForm from "./UserEdit";
import UserList from "./UserList";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);

  const addUser = (user) => {
    UserService.create(user.name, user.email, user.type, user.password)
      .then((res) => {
        if (res.data.id) {
          window.location.reload();
        } else {
          if (!res.data.state) {
            alert(res.data.message);
          } else
            alert(
              "Error en la solicitud, favor de contactarse con el administrador"
            );
        }
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
      });
  };

  const updateUser = (updatedUser) => {
    setUserToEdit(updatedUser);
    setIsModalOpen(true);
  };

  const updateUserService = (user) => {
    console.log("user_test:" + JSON.stringify(user));
    UserService.update(user.id, user.name, user.email, user.type, user.password)
      .then((res) => {
        if (res.status) {
          localStorage.setItem("isAuthenticated", "true");
          window.location.reload();
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
        alert(err);
      });
  };

  const deleteUser = (index) => {
    UserService.delete(index)
      .then((res) => {
        if (res.status) {
          window.location.reload();
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
        alert(err);
      });
  };

  const handleSubmit = (user) => {
    if (userToEdit) {
      updateUserService(user);
    } else {
      addUser(user);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        UserService.list()
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.error("Error al obtener los usuarios:", err);
            alert(err.response.data.message);
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Usuarios</h1>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Registrar
        </button>
        {/* <button
          onClick={handleLogout}
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Cerrar Sesión
        </button> */}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Agregar Usuario">
        <UserForm
          onSubmit={handleSubmit}
          userToEdit={userToEdit}
          setUserToEdit={setUserToEdit}
        />
      </Modal>

      <UserList users={users} onEdit={updateUser} onDelete={deleteUser} />
    </div>
  );
}

export default Users;
