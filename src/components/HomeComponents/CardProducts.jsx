import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { useCart } from "../../contexts/CartContext";
import { getImageUrl } from "../../services/api";

const CardProducts = ({ item, handleOpen, theme }) => {
  const { addToCart } = useCart();
  const backgroundClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black";
  const priceColorClass = theme === "dark" ? "text-blue-400" : "text-blue-600";
  const imageUrl = item.image ? getImageUrl(item.image) : "";

  const handleAddToCart = () => {
    const productToAdd = {
      id: item.id,
      title: item.name,
      price: `R$ ${item.value}`,
      image: item.image,
      quantity: 1,
    };
    addToCart(productToAdd);
  };

  return (
    <div
      className={`${backgroundClass} p-4 rounded-lg shadow-md hover:scale-105 transition-transform`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-60 object-cover rounded-md mb-2"
        />
      ) : (
        <div className="w-full h-60 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-md mb-2">
          <span className="text-gray-500 dark:text-gray-400">Sem Imagem</span>
        </div>
      )}
      <div className="mt-auto flex justify-end-safe space-x-2">
        <div className="mt-auto w-full flex flex-col items-start space-y-1">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm mt-1 text-gray-400">{item.description}</p>{" "}
          <p className={`${priceColorClass}`}>R$ {item.value}</p>
        </div>
        <div className="mt-auto flex justify-end space-x-2">
          <Tooltip title="Descrição" arrow>
            <IconButton
              onClick={() => handleOpen(item, "desc")}
              color="inherit"
            >
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
    </div>
  );
};

export default CardProducts;
