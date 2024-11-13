import React from 'react';
import ArticleList from "../components/ArticleList";
import LatestArticle from '../components/LatestArticle ';
import EventCalendar from '../components/EventCalendar';
import 'react-calendar/dist/Calendar.css'; 

function Home() {
  return (
    <div className="container mx-auto px-6 py-9">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
        <div className="lg:col-span-2  p-6">
          
          <LatestArticle />
        </div>

        <div className="lg:col-span-1  p-6">
         
          <div className="flex justify-center">
            <EventCalendar />
          </div>
        </div>
      </div>

      
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
       
        <ArticleList />
      </div>
    </div>
  );
}

export default Home;
