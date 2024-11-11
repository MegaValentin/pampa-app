import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/books`, {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
        setError("Hubo un problema al cargar los artículos");
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="flex-shrink-0 w-64 bg-white shadow-lg rounded-lg p-4"
        >
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-40 object-cover rounded"
            />
          )}
          <h2 className="text-lg font-semibold mt-2">{book.title}</h2>
          <p className="text-gray-600">by {book.author}</p>
          <p className="text-gray-700 text-sm mt-2 line-clamp-3">{book.synopsis}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
