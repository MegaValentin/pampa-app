import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {

    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/articles`, {
          withCredentials:true
        });
        setArticles(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <Spinner/>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 md:p-9">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {articles
          .slice()  
          .reverse() 
          .slice(1) 
          .map((article) => (
            <Link to={`/article/${article.id}`} key={article.id}>
            <div key={article.id} className="mt-3 border-b-1 border-gray-300 pb-6 transition-transform duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg articulo">
            
            {article.images?.map((img, index) => (
            <div key={index} className="mb-8 flex justify-center">
              <img
                className="max-w-full h-auto rounded shadow-md"
                src={`data:image/jpeg;base64,${img}`}
                alt={`${article.title}-${index}`}
              />
            </div>
          ))}
          
              <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 px-2">{article.title}</h2>
              <h3 className="text-lg  md:text-xl text-gray-600 mb-2 italic px-2">{article.subtitle}</h3>
            </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ArticleList;
