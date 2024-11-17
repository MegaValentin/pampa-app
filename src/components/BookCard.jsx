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
    <div className="mt-8 bg-white  p-6">

    <div className="container mx-auto px-4 lg:px-20 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className=" group overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <Link to={`/bookview/${book._id}`}>
              <img
                className="p-4 rounded-t-lg w-full h-60 object-contain"
                src={book.coverImage}
                alt={book.title}
              />
              <div className="px-4 pb-4">
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 group-hover:text-blue-800">
                  {book.title}
                </h5>
                <p className="text-gray-600 text-sm">Autor: {book.author}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
</div>
    </div>

     
    </>
  );
};

export default BookCard;
