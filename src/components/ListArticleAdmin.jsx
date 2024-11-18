import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import IconDelete from "./icons/IconDelete";
import IconView from "./icons/IconView";

const ListArticleAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
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

  const deleteArticle = async () => {
    if (!articleToDelete) return;

    try {
      await axios.delete(`${apiUrl}/api/article/${articleToDelete._id}`, {
        withCredentials: true,
      });

      setArticles((prev) => prev.filter((article) => article._id !== articleToDelete._id));
      setConfirmModalOpen(false);
      setArticleToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el artículo:", error);
      setError("Hubo un problema al eliminar el artículo");
    }
  };

  const openConfirmModal = (article) => {
    setArticleToDelete(article);
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
    setArticleToDelete(null);
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
                <Link
                  to={`/adminpreview/${article._id}`}
                  className="text-blue-500 hover:underline"
                >
                  <IconView />
                </Link>
                <button
                  onClick={() => openConfirmModal(article)}
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

      
      {confirmModalOpen && articleToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold">
              ¿Estás seguro de que deseas eliminar este artículo?
            </h2>
            <p className="text-gray-600 mt-2">{articleToDelete.title}</p>
            <p className="text-gray-600">{articleToDelete.subtitle}</p>
                <p className="text-gray-500 mt-1">
                  Publicado el: {new Date(articleToDelete.createAt).toLocaleDateString()}
                </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={deleteArticle}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListArticleAdmin;
