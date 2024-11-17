import React, { useState, useEffect } from "react";
import axios from "axios";
import IconGmail from "./icons/IconGmail";
import IconMessageOk from "./icons/IconMessageOk";

const PendingMessage = () => {
  const [pending, setPending] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/contacts`, {
          withCredentials: true,
        });
        const pendingMessages = response.data.filter(
          (message) => !message.status
        );
        setPending(pendingMessages);
      } catch (error) {
        console.error("Error al obtener los mensajes: ", error);
        setError("Hubo un problema al cargar los mensajes");
      }
    };
    fetchMessage();
  }, []);

  const handleMarkAsResponded = async (id) => {
    try {
      await axios.put(
        `${apiUrl}/api/contact/${id}`,
        { status: true },
        { withCredentials: true }
      );

      setPending((prev) => prev.filter((message) => message._id !== id));
    } catch (error) {
      console.error("Error al marcar el mensaje como respondido: ", error);
    }
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-2-4wl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Mensajes Pendientes
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {pending.length === 0 ? (
        <p className="text-center text-green-500 font-semibold">
          ¡Estás al día con los mensajes!
        </p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {pending.map((x) => (
            <li key={x.id} className="py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {x.name}
                </h2>
                <p className="text-gray-600">{x.email}</p>
                <p className="text-gray-500 mt-1">{x.message}</p>
              </div>
              <div className="py-4 flex items-center justify-between">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                    x.email
                  }&su=Respuesta%20a%20tu%20mensaje&body=Hola%20${encodeURIComponent(
                    x.name
                  )},%0A%0AGracias%20por%20contactarte%20con%20nosotros.%20A%20continuación%20te%20respondemos:%0A%0A`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-red-500 hover:text-red-900 font-bold py-2 px-4 rounded hover:bg-gray-200"
                >
                  <IconGmail />
                </a>
                <button
                  onClick={() => handleMarkAsResponded(x._id)}
                  className=" text-green-500 hover:text-green-900 font-bold py-2 px-4 rounded hover:bg-gray-200"
                >
                  <IconMessageOk />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingMessage;
