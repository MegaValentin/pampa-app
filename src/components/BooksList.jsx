import React, { useEffect, useState } from "react";
import IconDelete from "./icons/IconDelete";
import IconView from "./icons/IconView";
import IconClose from "./icons/IconClose";
import axios from "axios";
import BookDetailModal from "./BookDetailModal";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
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

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/books/${id}`, { withCredentials: true });
      
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      setError("Hubo un problema al eliminar el libro");
    }
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
    <div className="flex flex-wrap justify-center gap-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="flex-shrink-0 w-64 bg-white shadow-lg rounded-lg p-4"
        >
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full max-h-48 object-cover rounded"
            />
          )}
          <h2 className="text-lg font-semibold mt-2">{book.title}</h2>
          <p className="text-gray-600">by {book.author}</p>
          <p className="text-gray-700 text-sm mt-2 line-clamp-3">{book.synopsis}</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => openModal(book)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              <IconView />
            </button>
            <button
              onClick={() => deleteBook(book._id)}
              className="px-4 py-2 text-red-500 hover:text-red-700"
            >
              <IconDelete />
            </button>
          </div>
        </div>
      ))}
    </div>

    
    {modalOpen && selectedBook && (
      <BookDetailModal book={selectedBook} closeModal={closeModal} />
    )}
  </div>
  );
};

export default BookList;
