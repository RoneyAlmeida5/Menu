import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const HeaderSearch = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < 50) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-gray-900 py-4 transition-all duration-300"
      style={{
        left: showHeader ? "16rem" : "5rem", // 64 e 20
        right: 0,
      }}
    >
      <div className="flex items-center justify-between w-full px-6">
        {/* Input de busca */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <FiSearch />
          </span>
          <input
            type="text"
            placeholder="Pesquise seu produto"
            className="w-80 pl-10 p-2 rounded-xl bg-gray-800 text-white placeholder-gray-400"
          />
        </div>

        {/* Carrinho */}
        <div className="relative ml-4 overflow-visible">
          <button
            aria-label="Carrinho"
            className="relative cursor-pointer p-2 rounded-full hover:bg-gray-500 dark:hover:bg-gray-700 transition"
          >
            <ShoppingCartIcon className="text-2xl text-white" />
            {/* Badge */}
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 border-2 border-black dark:border-gray-900">
              4
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
