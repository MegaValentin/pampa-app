import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LatestArticle = () => {
  const [latestArticle, setLatestArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {

    const fetchLatestArticle = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/articles`);
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
      {latestArticle.status === "subido" && (
        <Link to={`/article/${latestArticle.id}`} key={latestArticle.id}>
        <div className="border-b-1 border-gray-300 pb-6 transition-transform duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg articulo">
        {latestArticle.images?.map((img, index) => (
            <div key={index} className="mb-8 flex justify-center">
              <img
                className="max-w-full h-auto "
                src={`data:image/jpeg;base64,${img}`}
                alt={`${latestArticle.title}-${index}`}
              />
            </div>
          ))}
          <h2 className="text-3xl font-bold text-gray-800 mb-2 px-2">{latestArticle.title}</h2>
          <h3 className="text-xl text-gray-600 mb-2 italic px-2">{latestArticle.subtitle}</h3>
         
        </div>
        </Link>
      )}
    </div>
  );
};

export default LatestArticle;
