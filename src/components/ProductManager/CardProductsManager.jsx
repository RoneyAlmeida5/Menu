import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { getImageUrl } from "../../services/api";

const CardProductsManager = ({ item, onEdit, onDelete, theme }) => {
  const backgroundClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black";
  const priceColorClass = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const imageUrl = item.image ? getImageUrl(item.image) : "";

  return (
    <div
      className={`${backgroundClass} w-full flex flex-col p-4 rounded-2xl 
        shadow-lg 
        dark:shadow-xl
        overflow-hidden
        transform hover:scale-105 hover:shadow-2xl
        transition
        duration-300
        ease-out`}
    >
      {imageUrl ? ( // Renderiza a imagem somente se a URL for válida
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-60 object-cover rounded-md mb-2"
        />
      ) : (
        // Opcional: Mostre um placeholder enquanto a imagem não carrega ou se não tiver imagem
        <div className="w-full h-60 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-md mb-2">
          <span className="text-gray-500 dark:text-gray-400">Sem Imagem</span>
        </div>
      )}

      <div className="mt-auto flex justify-end-safe space-x-2">
        <div className="mt-auto w-full flex flex-col items-start space-y-1">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm mt-1">{item.description}</p>{" "}
          <p className={`${priceColorClass} mt-2`}>R$ {item.value}</p>
        </div>
        <div className="mt-auto flex justify-end space-x-2">
          <Tooltip title="Editar" arrow>
            <IconButton onClick={() => onEdit(item)} color="inherit">
              <EditRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir" arrow>
            <IconButton onClick={() => onDelete(item.id)} color="error">
              <DeleteRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CardProductsManager;
