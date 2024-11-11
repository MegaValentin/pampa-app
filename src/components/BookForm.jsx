import React, { useState } from "react";
import axios from "axios";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    synopsis: "",
    publicationDate: "",
    coverImage: "",
    pages: "",
  });
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
    <div className="max-w-md mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Synopsis:
          <textarea
            name="synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Publication Date:
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Cover Image URL:
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Pages:
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookForm;
