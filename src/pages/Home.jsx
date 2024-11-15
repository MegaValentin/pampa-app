import React from 'react';
import ArticleList from "../components/ArticleList";
import LatestArticle from '../components/LatestArticle ';
import EventCalendar from '../components/EventCalendar';
import 'react-calendar/dist/Calendar.css'; 

function Home() {
  return (
    <div className="container mx-auto px-4 lg:px-20 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Último artículo */}
        <div className="lg:col-span-2 p-4 bg-white ">
          <LatestArticle />
        </div>

        {/* Calendario de eventos */}
        <div className="lg:col-span-1 p-4 bg-white ">
          <div className="flex justify-center">
            <EventCalendar />
          </div>
        </div>
      </div>

      {/* Lista de artículos */}
      <div className="mt-8 bg-white  p-6">
        <ArticleList />
      </div>
    </div>
  );
}

export default Home;
