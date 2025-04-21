import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
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
      } mt-20 bg-gray-700 text-white mb-4 pt-6 rounded-2xl transition-all duration-300 h-[calc(100vh-6rem)]`}
    >
      <div className="h-full overflow-y-auto px-6 pb-6">
        {/* BANNER PROMO */}
        <div className="mb-6">
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

              <div className="mt-4 flex items-end justify-end space-x-2">
                <Tooltip
                  title="Descrição"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#e0e0e0",
                        color: "#000",
                        fontSize: "0.875rem",
                        border: "1px solid #374151",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem",
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#1f2937",
                      },
                    },
                  }}
                >
                  <button className="text-gray-200 hover:text-gray-700 transition-colors">
                    <DescriptionRoundedIcon sx={{ fontSize: 28 }} />
                  </button>
                </Tooltip>
                <Tooltip
                  title="Adicionar ao carrinho"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#e0e0e0",
                        color: "#000",
                        fontSize: "0.875rem",
                        border: "1px solid #374151",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem",
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#1f2937",
                      },
                    },
                  }}
                >
                  <button className="text-gray-200 hover:text-gray-700 transition-colors">
                    <AddCircleRoundedIcon sx={{ fontSize: 25 }} />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
