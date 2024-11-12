import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddArticle from "./AddArticle";
import AddUser from "./AddUser";
import AdminCalendar from "./AddminCalindar";
import Galery from "./Galery";
import IconBurguer from "./icons/IconBurguer";
import IconClose from "./icons/IconClose";


const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const { isAuthenticated, logout, user } = useAuth();

  const renderContent = () => {
    switch (selectedOption) {
      case "addarticle":
        return <AddArticle />;
      case "adduser":
        return <AddUser />;
      case "calendar":
        return <AdminCalendar />;
      case "galery":
        return <Galery />;
      default:
        return (
          <div className="flex justify-center items-center h-full">
            <img src="/logo.png" alt="Logo" className="w-40" />
          </div>
        );
    }
  };

  const adminList = [
    { to: "addarticle", label: "Agregar Artículo" },
    { to: "calendar", label: "Administrar Calendario" },
    { to: "galery", label: "Galería Comercial" },
    { to: "adduser", label: "Gestión de Usuarios" },
  ];

  const renderButtons = (links) =>
    links.map((link, index) => (
      <button
        key={index}
        onClick={() => {
          setSelectedOption(link.to);
          setSidebarOpen(false); // Cierra la barra lateral al hacer clic en un botón
        }}
        className="text-left p-3 rounded-lg hover:bg-gray-700 mb-2 transition"
      >
        {link.label}
      </button>
    ));

  return (
    <div className="flex h-screen bg-gray-100">
      
      <nav
        className={`bg-gray-800 text-white w-64 flex flex-col p-6 lg:h-full fixed lg:relative lg:block ${
          sidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">PROYECTO PAMPA</h2>
        {renderButtons(adminList)}
        <Link
          to="/"
          className="mt-auto flex items-center justify-center lg:justify-between text-white p-3 rounded-lg bg-red-600 hover:bg-red-500 transition"
          onClick={() => {
            logout();
            setSidebarOpen(false); // Cierra la barra lateral al hacer clic en salir
          }}
        >
          Salir
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="M13 12v.01" />
            <path d="M3 21h18" />
            <path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5" />
            <path d="M14 7h7m-3 -3l3 3l-3 3" />
          </svg>
        </Link>
        
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-3 text-white bg-gray-800 rounded-full absolute top-4 left-1"
          >
            <IconClose/>
          </button>
        )}
      </nav>

      
      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
      
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-4 text-white bg-gray-800 rounded-md"
        >
          <IconBurguer/>
        </button>
        <div className="bg-white ">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
