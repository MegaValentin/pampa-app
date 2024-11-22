import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconClose from "./icons/IconClose";
import IconBurguer from "./icons/IconBurguer";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navList = [
    { to: "/articulos" , label: "Articulos"},
    { to: "/producciones" , label: "Galeria Comercial"},
    { to: "/contact" , label: "Contacto"}
  ]

  const renderLinks = (links) => 
    links.map((link, index) => (
      <li>
            <Link
              key={index}
              to={link.to}
              className="text-black hover:text-gray-300 transition duration-300"
            >
              {link.label}
            </Link>
          </li>
    )) 

  const renderLinksToggle = (links) =>
      links.map((link, index) => (
        <li>
            <Link
              key={index}
              to={link.to}
              className="text-black hover:text-gray-300 transition duration-300"
              onClick={toggleMenu}
            >
              {link.label}
            </Link>
          </li>
      ))
  
  return (
      
    <nav className="  mx-auto px-4 lg:px-20 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold flex items-center ml-10 px-10 lg:px-20"
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
              <IconClose/>
            ) : (
              <IconBurguer/>
            )}
          </button>
        </div>

        <ul className="hidden md:flex space-x-20 navegacion p-9 mr-24">
          {renderLinks(navList)}
        </ul>
      </div>

      <div
        className={`${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out md:hidden p-1 mb-5`}
      >
        <ul className="flex flex-col space-y-4 mt-4 text-center">
         {renderLinksToggle(navList)}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
