import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";

const ListRandomArticle = () => {
  const [articles, setArticles] = useState([]);
  const [randomArticles, setRandomArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/articles`);
        const fetchedArticles = response.data;

        // Selecciona 5 artículos aleatorios
        const randomSelection = getRandomArticles(fetchedArticles, 4);
        setArticles(fetchedArticles);
        setRandomArticles(randomSelection);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getRandomArticles = (articlesArray, count) => {
    const shuffled = articlesArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Función que maneja el clic y recarga la página
  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
    window.location.reload();
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 lg:px-20 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="container mx-auto p-4 md:p-9 md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Seguir leyendo
          </h2>
          <ul className="space-y-4">
            {randomArticles.map((article) => (
              <li
                key={article.id}
                className="flex items-center border-b-2 pb-4 cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                
                {article.images?.map((img, index) => (
                  <div key={index} className="mb-8 flex justify-center">
                    <img
                      className="w-20 h-20 object-cover mr-4 "
                      src={`data:image/jpeg;base64,${img}`}
                      alt={`${article.title}-${index}`}
                    />
                  </div>
                ))}
                <h3 className="text-lg font-semibold text-gray-800">
                  {article.title}
                </h3>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-1 flex justify-center items-center">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default ListRandomArticle;
