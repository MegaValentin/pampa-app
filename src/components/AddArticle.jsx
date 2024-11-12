import React, { useState } from 'react';
import axios from 'axios';
import ListArticleAdmin from './ListArticleAdmin';

const AddArticleForm = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map(file => URL.createObjectURL(file));
    setImages(fileURLs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/addarticle`, {
        title,
        subtitle,
        content,
        images,
        tags
      }, {
        withCredentials: true, 
      });
      setMessage('Artículo creado exitosamente');
      
      setTimeout(() => {
        setMessage("")
        setTitle('');
      setSubtitle('');
      setContent('');
      setImages([]);
      setTags('');
      }, 1500)
    } catch (error) {
      console.error('Error al crear el artículo:', error);
      setMessage('Error al crear el artículo');
      setTimeout(() => {
        setMessage("")
        setTitle('');
      setSubtitle('');
      setContent('');
      setImages([]);
      setTags('');
      }, 1500)
    }
  };

  return (
    <>
    
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Agregar Artículo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Subtítulo</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Contenido</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows="6"
            required
          ></textarea>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Imágenes</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Palabras Claves</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Ejemplo: cultura, historia"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
        >
          Crear Artículo
        </button>
      </form>
      {message && (
        <p className="mt-6 text-center text-lg font-medium text-green-600 animate-fade-in">
          {message}
        </p>
      )}

    </div>
      <ListArticleAdmin/>
    </>
  );
};

export default AddArticleForm;
