import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { FiSearch } from "react-icons/fi";
import { Plus, Info } from "lucide-react";
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
      } bg-gray-700 text-white min-h-screen p-6 rounded-2xl mt-15 transition-all duration-300`}
    >
      {/* Search bar */}
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

      {/* Banner */}
      <div className="mb-6 mt-5">
        <img
          src={Banner}
          alt="Banner de bolo"
          className="rounded-lg w-full h-70 object-cover"
        />
      </div>

      {/* Categoria Título */}
      <h2 className="text-2xl font-semibold mb-4">Bolos</h2>

      {/* Cards de produto */}
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

            {/* Botões de ação */}
            <div className="mt-4 flex items-end justify-end">
              <button className="flex items-center justify-center text-gray-200 hover:text-white border border-gray-300 hover:border-white rounded-lg mr-2 p-1 transition-colors">
                <Plus size={16} className="mr-1" />
              </button>
              <button className="flex items-center justify-center text-gray-200 hover:text-white border border-gray-300 hover:border-white rounded-lg p-1 transition-colors">
                <Info size={16} className="mr-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
