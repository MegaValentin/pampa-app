import IconDelete from "./icons/IconDelete";
import IconView from "./icons/IconView";
import IconUpload from "./icons/IconUpload";
import React from "react";
import { Link } from "react-router-dom";

const ArticleItem = ({ article, onDelete, onChangeStatus }) => {
  return (
    <li className="py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
        <p className="text-gray-600">{article.subtitle}</p>
        {article.status === "subido" ? (
            <p className="text-gray-500 mt-1">
          Publicado el: {new Date(article.fechaPublicacion).toLocaleDateString()}
            </p>

        ) : (
            <p className="text-gray-500 mt-1">
            Creado el: {new Date(article.createAt).toLocaleDateString()}
              </p>
  
        )}
      </div>
      <div className="flex space-x-4">
        {article.status !== "subido" && (
          <div>
            {article.status === "listo" && (
              <button
                onClick={() => onChangeStatus(article._id)}
                className="text-green-500 hover:text-green-700"
              >
                <IconUpload />
              </button>
            )}

            <Link
              to={`/adminpreview/${article._id}`}
              className="text-blue-500 hover:underline"
            >
              <IconView />
            </Link>
            <button
              onClick={() => onDelete(article)}
              className="text-red-500 hover:text-red-700"
            >
              <IconDelete />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default ArticleItem;
