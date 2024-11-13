import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import EventCalendar from "./EventCalendar";
const AdminCalendar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !date) {
      setMessage("Por favor, completar todos los campos");
      return;
    }

    const eventData = {
      title,
      description,
      date: date.toISOString(),
    };

    try {
      await axios.post(`${apiUrl}/api/addevents`, eventData, {
        withCredentials: true,
      });
      setMessage("Evento agregado exitosamente.");
      setTitle("");
      setDescription("");
      setDate(null);
    } catch (error) {
      console.error("Error al agregar el evento: ", error);
      setMessage("Hubo un problema al agregar el evento. ");
    }
  };

  return (
    <>
    <div className="p-6 bg-white  max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4"> Agregar Evento</h2>
      {message && <p className="text-center mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Titulo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Titulo del evento"
          />
        </div>
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Descripción del evento"
          />
        </div>
        <div>
          <label className="block text-gray-700">Fecha y Hora</label>
          <DatePicker
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholderText="Selecciona la fecha y hora"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
        >
          Agregar Evento
        </button>
      </form>
    </div>

    <EventCalendar/>
    </>
  );
};

export default AdminCalendar;
