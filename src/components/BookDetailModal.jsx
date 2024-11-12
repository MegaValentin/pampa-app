import React from "react";
import IconClose from "./icons/IconClose";

const BookDetailModal = ({ book, closeModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-full relative overflow-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <IconClose />
        </button>

        <h2 className="text-2xl font-semibold mt-12">{book.title}</h2>

        <img
          src={book.coverImage}
          alt={book.title}
          className="mt-4 w-full max-h-80 object-cover rounded"
        />     
        <p className="text-gray-600 mt-2">Autor: {book.author}</p>
        <div className="text-gray-700 mt-4 max-h-96 overflow-y-auto">
          <p>{book.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
