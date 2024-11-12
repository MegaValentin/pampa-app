import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import IconDelete from "./icons/IconDelete";
import IconView from "./icons/IconView";

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

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/article/${id}`, { withCredentials: true });
      
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      console.error("Error al eliminar el articulo:", error);
      setError("Hubo un problema al eliminar el articulo");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4 text-center">Lista de Artículos</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    {articles.length > 0 ? (
      <ul className="divide-y divide-gray-200">
        {articles.map((article) => (
          <li key={article._id} className="py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {article.title}
              </h2>
              <p className="text-gray-600">{article.subtitle}</p>
              <p className="text-gray-500 mt-1">
                Publicado el: {new Date(article.createAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to={`/adminpreview/${article._id}`} className="text-blue-500 hover:underline">
                <IconView/>
              </Link>
              <button
                onClick={() => deleteArticle(article._id)}
                className="text-red-500 hover:text-red-700"
              >
                <IconDelete />
              </button>
            </div>
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
