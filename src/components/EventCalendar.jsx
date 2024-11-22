import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import IconDelete from "./icons/IconDelete";

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tooltip, setTooltip] = useState("");
  const [ confirmModalOpen, setConfirmModalOpen ] = useState(false)
  const [ eventDelete, setEventDelete ] = useState(null)
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/events`);
        const formattedEvents = response.data.map((event) => ({
          ...event,
          date: event.date.slice(0, 10), // Asegurar formato "YYYY-MM-DD"
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  const highlightDates = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().slice(0, 10);
      const dayEvents = events.filter((event) => event.date === formattedDate);

      if (dayEvents.length > 0) {
        return "react-calendar__tile--highlight";
      }
    }
  };

  const handleHover = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    const dayEvents = events.filter((event) => event.date === formattedDate);

    if (dayEvents.length > 0) {
      const titles = dayEvents.map((event) => event.title).join(", ");
      setTooltip(`Eventos: ${titles}`);
    } else {
      setTooltip("");
    }
  };

  const handleDeleteEvent = async () => {
    if(!eventDelete) return;

      try {
        await axios.delete(`${apiUrl}/api/events/${eventDelete._id}`, {
          withCredentials: true,
        });
        setEvents(events.filter((event) => event._id !== eventDelete._id));
        setConfirmModalOpen(false)
        setEventDelete(null)
        
      } catch (error) {
        console.log("Error al eliminar el evento: ", error);
        
      }
    
  };

  const openConfimModal = (event ) => {
    setEventDelete(event)
    setConfirmModalOpen(true)
  }

  const closeConfirmModal = () => {
    setConfirmModalOpen(false)
    setEventDelete(null)
  }

  return (
    <div className="container mx-auto p-4 md:p-9">
      <div className="calendar-container relative flex justify-center items-center h-full">
  <Calendar
    onChange={setSelectedDate}
    value={selectedDate}
    tileClassName={highlightDates}
    onMouseOver={({ activeStartDate, date }) => handleHover(date)}
    className="py-4"
  />
  {tooltip && (
    <div className="tooltip absolute bg-gray-700 text-white text-sm rounded px-2 py-1 shadow-lg">
      {tooltip}
    </div>
  )}
</div>

      <div className="event-details flex-grow p-4 mt-5">
        <h3 className="text-xl font-semibold mb-2">
          {selectedDate.toLocaleDateString()}:
        </h3>
        <ul className="space-y-2">
          {events
            .filter(
              (event) => event.date === selectedDate.toISOString().slice(0, 10)
            )
            .map((event) => (
              <li
                key={event.id}
                className="py-4 flex items-center justify-between"
              >
                <span>{event.title}</span>

                <button
                  onClick={() => openConfimModal(event)}
                  className=" text-red-500 px-2 py-1 rounded hover:text-red-600"
                >
                  <IconDelete/>
                </button>
              </li>
            ))}
          {events.filter(
            (event) => event.date === selectedDate.toISOString().slice(0, 10)
          ).length === 0 && (
            <li className="text-gray-500">No hay eventos para este día</li>
          )}
        </ul>
      </div>
      {confirmModalOpen && eventDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-lg font-bold">
            ¿Estás seguro de que deseas eliminar "{eventDelete.title}" ?
          </h2>
         
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={closeConfirmModal}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteEvent}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    )}
      
    </div>
  );
};

export default EventCalendar;
