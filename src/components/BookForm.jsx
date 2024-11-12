import React, { useState } from "react";
import axios from "axios";

const BookForm = () => {
  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ synopsis, setSynopsis ] = useState("")
  const [ publicationDate, setPublicationDate ] = useState("")
  const [ coverImage, setCoverImage ] = useState("")
  const[ pages, setPages] = useState("")
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/addbook`, {
        title,
        author,
        synopsis,
        publicationDate,
        coverImage,
        pages,
      }, {
        withCredentials: true, 
      });
      setMessage('Artículo creado exitosamente');
      
      setTimeout(() => {
        setMessage("")
        setTitle('');
        setAuthor('');
        setSynopsis('');
        setPublicationDate("");
        setCoverImage("");
        setPages("")
      }, 1500)
    } catch (error) {
      console.error('Error al agregar el libro:', error);
      setMessage('Error al agregar el libro');
      setTimeout(() => {
        setMessage("")
        setTitle('');
        setAuthor('');
        setSynopsis('');
        setPublicationDate("");
        setCoverImage("");
      }, 1500)
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">AGREGAR NUEVO LIBRO</h1>
      <form onSubmit={handleSubmit} className="mb-10">
        <label className="block text-gray-700 font-semibold mb-2">
          Titulo:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
            />
        </label>
        <label className="block text-gray-700 font-semibold mb-2">
          Autor:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
        </label>
        <label className="block text-gray-700 font-semibold mb-2">
          Sinopsis:
          <textarea
            name="synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
        </label>
        <label className="block text-gray-700 font-semibold mb-2">
          Fecha de la Publicacion:
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
            />
        </label>
        <label className="block text-gray-700 font-semibold mb-2">
          URL Imagen:
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
        </label>
        <label className="block text-gray-700 font-semibold mb-2">
          Paginas:
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 mb-5"
            />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
          Agregar
        </button>
      </form>
      {message && <p className="mb-4 text-green-500">{message}</p>}
    </div>
  );
};

export default BookForm;
