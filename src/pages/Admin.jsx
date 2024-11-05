import React from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 

function Admin() {
  return (
    <div className="container mx-auto p-9">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 flex justify-center items-center">
          
          <h1>El usuario esta logueado</h1>
        </div>
      </div>
    </div>
  );
}

export default Admin;
