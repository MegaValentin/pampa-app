import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        succes: false,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => {
        setStatus("")
      
      }, 1500)
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/addcontacts`, formData, {
        withCredentials: true,
      });

      setStatus({
        succes:false,
        message:"Gracias por comunicarte con nosotros"})
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("")
      
      }, 1500)
    } catch (error) {
      console.error("Error al nviar el formulario: ", error);
      setStatus({
        succes: false,
        message: error.response?.data?.error || "Error al enviar el formulario",
      });
      setTimeout(() => {
        setStatus("")
      
      }, 1500)
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 ">
      <h1>Falta agregar texto</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white  px-8 pt-6 pb-8"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu nombre"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu correo"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Escribe tu mensaje"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
      {status && (
        <div
          className={`mt-4 p-4 rounded ${
            status.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
};

export default Contact;
