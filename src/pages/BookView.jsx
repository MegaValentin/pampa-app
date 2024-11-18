import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";


const BookView = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [visibleStart, setVisibleStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const [bookResponse, allBooksResponse] = await Promise.all([
          axios.get(`${apiUrl}/api/book/${id}`, { withCredentials: true }),
          axios.get(`${apiUrl}/api/books`, { withCredentials: true }),
        ]);

        setBook(bookResponse.data);

        // Filtrar y mezclar los libros relacionados
        const filteredBooks = allBooksResponse.data.filter((b) => b._id !== id);
        setRelatedBooks(filteredBooks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();

    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, apiUrl]);

  const handleNext = () => {
    setVisibleStart((prevStart) => (prevStart + 1) % relatedBooks.length);
  };

  const handlePrev = () => {
    setVisibleStart(
      (prevStart) => (prevStart - 1 + relatedBooks.length) % relatedBooks.length
    );
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const visibleBooks = [
    ...relatedBooks.slice(visibleStart, visibleStart + 4),
    ...relatedBooks.slice(
      0,
      Math.max(0, visibleStart + 4 - relatedBooks.length)
    ),
  ];

  return (
    <div key={id} className="container mx-auto px-4 lg:px-20 py-8">
      {/* Detalles del libro */}
      {book && (
        <div className="bg-white md:flex mb-8 g">
          <div className="md:w-1/3 p-4 flex justify-center items-center">
            <img
              src={book.coverImage}
              alt={`Portada del libro ${book.title}`}
              className="w-full h-auto max-h-80 object-contain rounded-lg"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {book.title}
            </h1>
            <h2 className="text-xl text-gray-600 italic mb-4">
              Autor: {book.author}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
              {book.synopsis}
            </p>
          </div>
          <p>Falta agregar el instagram </p>
        </div>
      )}

      {/* Slider de libros relacionados */}
      <div className="bg-white p-10 mt-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Otros libros</h2>
        <div className="flex items-center">
          {/* Botón para retroceder */}
          <button
            className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 text-xl"
            onClick={handlePrev}
          >
            &#8249;
          </button>

          {/* Libros visibles */}
          <div className="flex gap-4 overflow-hidden mx-4">
            {visibleBooks.map((relatedBook) => (
              <div
                key={relatedBook._id}
                className="w-48 min-w-[12rem] p-4 flex-shrink-0 hover:scale-105 transition-transform"
              >
                <Link
                  to={`/bookview/${relatedBook._id}`}
                  onClick={(e) => {
                    e.preventDefault(); // Evitar el comportamiento predeterminado de navegación de React Router
                    window.location.href = `/bookview/${relatedBook._id}`;
                  }}
                >
                  <img
                    className="rounded-lg w-full h-40 object-contain mb-2"
                    src={relatedBook.coverImage}
                    alt={`Portada del libro ${relatedBook.title}`}
                  />
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {relatedBook.title}
                  </h3>
                  <p className="text-gray-600 text-sm truncate">
                    Autor: {relatedBook.author}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          {/* Botón para avanzar */}
          <button
            className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 text-xl"
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookView;
