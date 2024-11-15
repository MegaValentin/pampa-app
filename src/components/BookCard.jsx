import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BookCard = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/books`, {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error al obtener los Libro:", error);
        setError("Hubo un problema al cargar los artículos");
      }
    };
    fetchBooks();
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
    <div className="container mx-auto p-6">
  <div className="flex flex-wrap justify-center gap-4">
    {books.map((book) => (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow articulo group overflow-hidden transform transition duration-300 hover:scale-105">
        <Link to={`/bookview/${book._id}`}>
            <img
                className="p-4 rounded-t-lg w-full h-80 object-contain"
                src={book.coverImage}
                alt={book.title}
            />
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-800">
                    {book.title}
                </h5>
                <p className="text-gray-600">Autor: {book.author}</p>
            </div>
        </Link>
    </div>
    ))}
  </div>
</div>

     
    </>
  );
};

export default BookCard;
