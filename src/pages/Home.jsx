import React, { useState, useEffect } from "react";
// ICONS
import { FiSearch } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
// IMAGENS
import Banner from "../assets/banner.jpeg";
import BannerCard from "../assets/bannercard.jpeg";

function Home() {
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
      className={`${
        showHeader ? "ml-64" : "ml-20"
      } bg-gray-700 text-white min-h-screen p-6 rounded-2xl mt-20 transition-all duration-300`}
    >
      {/* SEARCH */}
      <div className="flex items-center justify-between w-full">
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

        <div className="relative ml-4">
          <button
            aria-label="Carrinho"
            className="cursor-pointer p-2 rounded-full hover:bg-gray-500 dark:hover:bg-gray-700 transition"
          >
            <ShoppingCartIcon className="text-2xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 border-2 border-black dark:border-gray-900">
              4
            </span>
          </button>
        </div>
      </div>

      {/* BANNER PROMO */}
      <div className="mb-6 mt-5">
        <img
          src={Banner}
          alt="Banner de bolo"
          className="rounded-lg w-full h-70 object-cover"
        />
      </div>

      {/* CATEGORIA SELECIONADA */}
      <h2 className="text-2xl font-semibold mb-4">Bolos</h2>

      {/* CARDS PRODUTOS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={BannerCard}
              alt="Bolo de chocolate"
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold dark:text-white text-black">
              Bolo de Chocolate com Morango
            </h3>
            <p className="text-gray-400 dark:text-gray-300">R$ 49,90</p>

            {/* BOTÕES DESC E ADICIONAR */}
            <div className="mt-4 flex items-end justify-end">
              <Tooltip
                title="Descrição"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "#e0e0e0", // Tailwind: bg-gray-800
                      color: "#000", // Tailwind: text-gray-100
                      fontSize: "0.875rem",
                      border: "1px solid #374151", // Tailwind: border-gray-700
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.5rem",
                    },
                  },
                  arrow: {
                    sx: {
                      color: "#1f2937", // bg-gray-800
                    },
                  },
                }}
              >
                <button className="flex items-center justify-center text-gray-200 hover:text-gray-700 hover:border-white rounded-lg transition-colors">
                  <DescriptionRoundedIcon
                    sx={{ fontSize: 28 }}
                    className="w-20 mr-1"
                  />
                </button>
              </Tooltip>
              <Tooltip
                title="Adicionar ao carrinho"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "#e0e0e0", // Tailwind: bg-gray-800
                      color: "#000", // Tailwind: text-gray-100
                      fontSize: "0.875rem",
                      border: "1px solid #374151", // Tailwind: border-gray-700
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.5rem",
                    },
                  },
                  arrow: {
                    sx: {
                      color: "#1f2937", // bg-gray-800
                    },
                  },
                }}
              >
                <button className="flex items-center justify-center text-gray-200 hover:text-gray-700 hover:border-white rounded-lg transition-colors">
                  <AddCircleRoundedIcon
                    sx={{ fontSize: 25 }}
                    className="text-2xl mr-1"
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
