import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const CardProductsManager = ({ item, onEdit, onDelete, theme }) => {
  const backgroundClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black";
  const priceColorClass = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`${backgroundClass} w-full h-full p-4 rounded-lg shadow-md hover:scale-105 transition-transform`}
    >
      <img
        src={`http://localhost:3000${item.image}`}
        alt={item.name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm mt-1">{item.description}</p>{" "}
      <p className={`${priceColorClass} mt-2`}>R$ {item.value}</p>
      <div className="mt-4 flex justify-end space-x-2">
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
  );
};

export default CardProductsManager;
