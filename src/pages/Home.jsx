import React from 'react';
import ArticleList from "../components/ArticleList";
import LatestArticle from '../components/LatestArticle ';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 

function Home() {
  return (
    <div className="container mx-auto p-9">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="md:col-span-2">
          <LatestArticle />
        </div>

        
        <div className="md:col-span-1 flex justify-center items-center">
          <Calendar />
        </div>
      </div>

      <div>
        <ArticleList />
      </div>
    </div>
  );
}

export default Home;
