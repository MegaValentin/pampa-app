import React from 'react';
import IconLogout from './icons/iconLogout';
const Header = () => {
  return (
    <header className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        <span>Usuario</span>
        <IconLogout/>
      </div>
    </header>
  );
};

export default Header;
