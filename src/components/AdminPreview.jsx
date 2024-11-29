import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Importa useNavigate
import Spinner from '../components/Spinner';
import axios from 'axios';

const AdminPreview = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/article/${id}`, {
        withCredentials: true,
      });
      setArticle(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar el artículo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id, apiUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  const changeStatusToReady = async () => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/article/${id}/status`,
        { status: 'listo' },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setStatusChanged(true);
        await fetchArticle();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar el estado del artículo');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 md:p-9">
      {article && (
        <div className="bg-white p-6 md:p-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 border-b-2 pb-2">{article.title}</h1>
          <h2 className="text-2xl text-gray-600 italic mb-4">{article.subtitle}</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
            {article.content}
          </p>

          {article.images?.map((img, index) => (
            <div key={index} className="mb-8 flex justify-center">
              <img
                className="max-w-full h-auto rounded shadow-md"
                src={`data:image/jpeg;base64,${img}`}
                alt={`${article.title}-${index}`}
              />
            </div>
          ))}

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Volver
            </button>

            <button
              onClick={changeStatusToReady}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Cambiar a "Listo"
            </button>
          </div>

          {statusChanged && (
            <p className="mt-4 text-green-500">El estado del artículo se ha cambiado a "Listo".</p>
          )}
        </div>
      )}
    </div>
  );
};




export default AdminPreview;
