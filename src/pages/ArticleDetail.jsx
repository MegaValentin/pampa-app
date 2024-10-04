import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';
import ListRandomArticle from '../components/ListRandomArticle';

const ArticleDetail = () => {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiURL = `https://66fdcfad6993693089564945.mockapi.io/api/article/${id}`;

    const fetchArticle = async () => {
      try {
        const response = await axios.get(apiURL);
        setArticle(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); 

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
    <div className="container mx-auto p-4 md:p-9">
      {article && (
        <>

          <div className="bg-white p-6 md:p-10 ">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 border-b-2 pb-2">{article.title}</h1>
            <h2 className="text-2xl text-gray-600 italic mb-4">{article.subtitle}</h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
              {article.article}
            </p>
            
          <div className=" mb-8">
            <img
              className="w-full h-full object-cover p-10"
              src={article.image}
              alt={article.title}
            />
          </div>
            
          </div>
        </>
      )}
    </div>
    <ListRandomArticle/>
    </>
  );
};

export default ArticleDetail;
