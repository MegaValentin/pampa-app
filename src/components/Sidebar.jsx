
import React from 'react';

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold text-center py-4">Proyecto Pampa</h2>
      <nav className="flex flex-col p-4 space-y-2">
        <button onClick={() => setActiveSection('home')} className="py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600">Inicio</button>
        <button onClick={() => setActiveSection('users')} className="py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600">Usuarios</button>
        <button onClick={() => setActiveSection('settings')} className="py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600">Configuración</button>
      </nav>
    </div>
  );
};

export default Sidebar;
