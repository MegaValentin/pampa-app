import React, { useEffect, useState } from "react";
import IconDelete from "./icons/IconDelete";
import IconView from "./icons/IconView";
import axios from "axios";
import BookDetailModal from "./BookDetailModal";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/books`, {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
        setError("Hubo un problema al cargar los libros");
      }
    };
    fetchBooks();
  }, []);

  const deleteBook = async () => {
    if (!bookToDelete) return;

    try {
      await axios.delete(`${apiUrl}/api/books/${bookToDelete._id}`, {
        withCredentials: true,
      });

      setBooks((prev) => prev.filter((book) => book._id !== bookToDelete._id));
      setConfirmModalOpen(false);
      setBookToDelete(null);
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

  const openConfirmModal = (book) => {
    setBookToDelete(book);
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
    setBookToDelete(null);
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
            <p className="text-gray-700 text-sm mt-2 line-clamp-3">
              {book.synopsis}
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => openModal(book)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <IconView />
              </button>
              <button
                onClick={() => openConfirmModal(book)}
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

      
      {confirmModalOpen && bookToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold">
              ¿Estás seguro de que deseas eliminar "{bookToDelete.title}" ?
            </h2>
           
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={deleteBook}
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

export default BookList;
