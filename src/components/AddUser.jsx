import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import IconDelete from "./icons/IconDelete";
import IconClose from "./icons/IconClose";
const AddUser = () => {
  const { user, addUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(formData);
    setSuccessMessage("Usuario agregado correctamente");
    setFormData({
      username: "",
      password: "",
    });
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const openModal = (book) => {
    
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/users`, {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching toners:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
     
      await axios.delete(`${apiUrl}/api/auth/user/${id}`, {
        withCredentials: true, 
      });
      // Eliminar el toner de la lista toners
      
      setUsers(users.filter((user) => user.id !== id));
      fetchUsers();
    } catch (error) {
      console.error("Error deleting toner:", error);
    }
};

  return (
    <div className="p-8 rounded-lg w-full mt-10">
        <h2>Gestion de Usuarios</h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-11/12 max-w-md mx-auto">
          <div className="mb-5">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
          </div>
          <div className="mb-5 uppercase">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
            >
              Agregar Usuario
            </button>
          </div>
          {successMessage && (
            <div className="mt-4 text-center text-green-500 font-semibold">
              <p>{successMessage}</p>
            </div>
          )}
        </form>
      </div>
      <div className=" ml-1 mt-6">
        <button
          onClick={openModal}
          className="text-gray-500 hover:text-gray-700 "
        >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
        </button>
      </div>
      {modalOpen && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative overflow-auto">
      <button
        onClick={closeModal}
        className="absolute top-2 left-0  text-gray-500 hover:text-gray-700 z-10"
      >
        <IconClose/>
      </button>
      <div className="table-container overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400 table-fixed-header">
          <thead className="text-xs uppercase bg-sky-900 ">
            <tr className="text-white">
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b bg-white text-black">
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {user.username}
                </td>
                <td className="px-4 py-2 text-gray-900">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <IconDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default AddUser;
