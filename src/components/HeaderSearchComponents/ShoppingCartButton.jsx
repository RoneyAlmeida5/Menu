import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../contexts/CartContext";

const ShoppingCartButton = ({ onCartClick, theme }) => {
  const { totalQuantity } = useCart();
  const iconColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <div className="relative ml-4 overflow-visible">
      <button
        onClick={onCartClick}
        aria-label="Carrinho"
        className="relative cursor-pointer p-2 rounded-full hover:bg-gray-500 dark:hover:bg-gray-700 transition"
      >
        <ShoppingCartIcon className={`text-2xl ${iconColor}`} />
        {totalQuantity > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 border-2 border-black dark:border-gray-900">
            {totalQuantity}
          </span>
        )}
      </button>
    </div>
  );
};

export default ShoppingCartButton;
