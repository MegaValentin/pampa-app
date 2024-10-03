import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import axios from 'axios';

const LatestArticle = () => {
  const [latestArticle, setLatestArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiURL = 'https://66fdcfad6993693089564945.mockapi.io/api/article';

    const fetchLatestArticle = async () => {
      try {
        const response = await axios.get(apiURL);
        const articles = response.data;
        const lastArticle = articles.slice().reverse()[0];
        setLatestArticle(lastArticle);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticle();
  }, []);

  if (loading) return <Spinner/>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-9">
      {latestArticle && (
        <div className="border-b-1 border-gray-300 pb-6 transition-transform duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg articulo">
          <img
            className="w-full h-48 object-cover mb-4"
            src={latestArticle.image}
            alt={latestArticle.title}
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2 px-2">{latestArticle.title}</h2>
          <h3 className="text-xl text-gray-600 mb-2 italic px-2">{latestArticle.subtitle}</h3>
         
        </div>
      )}
    </div>
  );
};

export default LatestArticle;
