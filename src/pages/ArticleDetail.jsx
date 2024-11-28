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
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/article/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError('No se pudo cargar el artículo. Por favor, inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Función para dividir el contenido en bloques
  const splitContentWithImages = (content, images) => {
    const paragraphs = content.split(/\n+/); // Dividir el contenido en párrafos
    const combined = [];

    for (let i = 0; i < paragraphs.length; i++) {
      combined.push(<p key={`p-${i}`} className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">{paragraphs[i]}</p>);

      if (images?.[i]) {
        combined.push(
          <div key={`img-${i}`} className="flex justify-center my-4">
            <img
              className="max-w-full h-auto rounded shadow-md object-cover"
              src={`data:image/jpeg;base64,${images[i]}`}
              alt={`Imagen ${i + 1}`}
            />
          </div>
        );
      }
    }

    return combined;
  };

  return (
    <>
      <div className="container mx-auto px-4 lg:px-20 py-8">
        {article && (
          <div className="bg-white p-6 md:p-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
              {article.title}
            </h1>
            <h2 className="text-2xl text-gray-600 italic mb-4">
              {article.subtitle}
            </h2>

            {splitContentWithImages(article.content, article.images)}
          </div>
        )}
      </div>
      <ListRandomArticle />
    </>
  );
};

export default ArticleDetail;
