import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tooltip, setTooltip] = useState("");

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/events`);
                const formattedEvents = response.data.map(event => ({
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
            const dayEvents = events.filter(event => event.date === formattedDate);

            if (dayEvents.length > 0) {
                return "react-calendar__tile--highlight";
            }
        }
    };

    const handleHover = (date) => {
        const formattedDate = date.toISOString().slice(0, 10);
        const dayEvents = events.filter(event => event.date === formattedDate);
        
        if (dayEvents.length > 0) {
            const titles = dayEvents.map(event => event.title).join(", ");
            setTooltip(`Eventos: ${titles}`);
        } else {
            setTooltip("");
        }
    };

    return (
        <div className="flex space-x-8 max-w-4xl mx-auto p-6">
            <div className="calendar-container relative">
                
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileClassName={highlightDates}
                    onMouseOver={({ activeStartDate, date }) => handleHover(date)}
                />
                {tooltip && (
                    <div className="tooltip absolute bg-gray-700 text-white text-sm rounded px-2 py-1 shadow-lg">
                        {tooltip}
                    </div>
                )}
            </div>
            
            <div className="event-details flex-grow p-4 border-l border-gray-300">
                <h3 className="text-xl font-semibold mb-2">
                    {selectedDate.toLocaleDateString()}:
                </h3>
                <ul className="space-y-2">
                    {events
                        .filter(event => event.date === selectedDate.toISOString().slice(0, 10))
                        .map(event => (
                            <li key={event.id} className="text-gray-800 bg-gray-100 p-2 rounded shadow">
                                {event.title}
                            </li>
                        ))}
                    {events.filter(event => event.date === selectedDate.toISOString().slice(0, 10)).length === 0 && (
                        <li className="text-gray-500">No hay eventos para este día</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default EventCalendar;
