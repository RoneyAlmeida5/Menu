import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const ListProducts = ({ item, handleOpen }) => {
  return (
    <div className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      <p className="text-gray-400">{item.price}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <Tooltip title="Descrição" arrow>
          <IconButton onClick={() => handleOpen(item, "desc")} color="inherit">
            <DescriptionRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Adicionar ao carrinho" arrow>
          <IconButton onClick={() => handleOpen(item, "add")} color="inherit">
            <AddCircleRoundedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ListProducts;
