import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArticleItem from "./ArticleItem";

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

      setArticles((prev) =>
        prev.filter((article) => article._id !== articleToDelete._id)
      );
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

  const changeStatusToUploaded = async (articleId) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/article/${articleId}/status`,
        { status: "subido" },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setArticles((prev) =>
          prev.map((article) =>
            article._id === articleId
              ? { ...article, status: "subido" }
              : article
          )
        );
      }
    } catch (error) {
      console.error("Error al cambiar el estado del articulo: ", error);
      setError("Hubo un error al cambiar el estado del articulo");
    }
  };

  const renderArticleList = (title, articles, onDelete, onChangeStatus) => {
    if (articles.length === 0) return null;

    return (
      <>
        <h4 className="text-lg font-bold my-4">{title}</h4>
        <ul className="divide-y divide-gray-200">
          {articles.map((article) => (
            <ArticleItem
              key={article._id}
              article={article}
              onDelete={onDelete}
              onChangeStatus={onChangeStatus}
            />
          ))}
        </ul>
      </>
    );
  };

  const filterArticleByStatus = (status) =>
    articles.filter((article) => article.status === status);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Lista de Artículos
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {articles.length > 0 ? (
        <>
          {renderArticleList(
            "Borradores",
            filterArticleByStatus("borrador"),
            (article) =>
              setConfirmModalOpen(true) || setArticleToDelete(article),
            changeStatusToUploaded
          )}
          {renderArticleList(
            "Artículos Listos para Subir",
            filterArticleByStatus("listo"),
            (article) =>
              setConfirmModalOpen(true) || setArticleToDelete(article),
            changeStatusToUploaded
          )}
          {renderArticleList(
            "Artículos Publicados",
            filterArticleByStatus("subido"),
            (article) =>
              setConfirmModalOpen(true) || setArticleToDelete(article),
            changeStatusToUploaded
          )}
        </>
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
              Publicado el:{" "}
              {new Date(articleToDelete.createAt).toLocaleDateString()}
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setConfirmModalOpen(false)}
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
