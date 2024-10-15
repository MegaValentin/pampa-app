import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage'

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return < LoginPage/>;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
