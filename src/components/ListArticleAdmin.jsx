import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ListArticleAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/articles`, {
          withCredentials: true,
        });
        setArticles(response.data);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
        setError("Hubo un problema al cargar los artículos");
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Lista de Artículos del Admin</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {articles.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {articles.map((article) => (
            <li key={article._id} className="py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {article.title}
              </h2>
              <p className="text-gray-600">{article.subtitle}</p>
              <p className="text-gray-500 mt-1">
                Publicado el: {article.createAt}
              </p>
              <Link to={`/adminpreview/${article.id}`}>
               
                <div  className="mt-2 text-blue-500 hover:underline"  >Ver más</div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No hay artículos disponibles.</p>
      )}
    </div>
  );
};

export default ListArticleAdmin;
