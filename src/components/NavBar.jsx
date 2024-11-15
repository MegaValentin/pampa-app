import React, { useState } from "react";
import { Link } from "react-router-dom";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-1">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold flex items-center ml-10"
        >
          <img src="/logo.png" alt="Logo" className="w-40 mr-2" />
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-black focus:outline-none mr-9"
          >
            {isOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>

        <ul className="hidden md:flex space-x-20 navegacion p-9 mr-24">
          <li>
            <Link
              to="/articulos"
              className="text-black hover:text-gray-300 transition duration-300"
            >
              Artículos
            </Link>
          </li>
          <li>
            <Link
              to="/producciones"
              className="text-black hover:text-gray-300 transition duration-300"
            >
              Galeria Comercial
            </Link>
          </li>
          
          <li>
            <Link
              to="/calendario"
              className="text-black hover:text-gray-300 transition duration-300"
            >
              Calendario
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={`${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out md:hidden p-1 mb-5`}
      >
        <ul className="flex flex-col space-y-4 mt-4 text-center">
          <li>
            <Link
              to="/articulos"
              className="text-black hover:text-gray-300 transition duration-300"
              onClick={toggleMenu}
            >
              Artículos
            </Link>
          </li>
          <li>
            <Link
              to="/producciones"
              className="text-black hover:text-gray-300 transition duration-300"
              onClick={toggleMenu}
            >
              Librería
            </Link>
          </li>
          
          <li>
            <Link
              to="/calendario"
              className="text-black hover:text-gray-300 transition duration-300"
              onClick={toggleMenu}
            >
              Calendario
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
