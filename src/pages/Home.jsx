import React, { useState, useEffect } from "react";
import ProductModal from "../components/ProductModal";
// MATERIAL UI
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
// IMAGE
import Banner from "../assets/banner.jpeg";
import BannerCard from "../assets/bannercard.jpeg";

function Home() {
  const [showHeader, setShowHeader] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("desc");
  const [activeItem, setActiveItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // LOGICA PARA RESGATAR DADOS DOS PRODUTOS
  const items = Array.from({ length: 6 }, () => ({
    title: "Bolo de Chocolate com Morango",
    price: "R$ 49,90",
    img: BannerCard,
    description:
      "Delicioso bolo de chocolate com morango fresco e cobertura cremosa.",
  }));

  // OPEN MODAL
  const handleOpen = (item, action) => {
    setActiveItem(item);
    setMode(action);
    setQuantity(1);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // EFEITO MENU LATERAL
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
      {/* IMAGEM CARD */}
      <div className="h-full overflow-y-auto px-6 pb-6">
        <div className="mb-6">
          <img
            src={Banner}
            alt="Banner de bolo"
            className="rounded-lg w-full h-70 object-cover"
          />
        </div>
        {/* TEXT CARD */}
        <h2 className="text-2xl font-semibold mb-4">Bolos</h2>
        {/* BUSCA PELO PRODUTO */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-gray-400">{item.price}</p>
              {/* ICONS CARD */}
              <div className="mt-4 flex justify-end space-x-2">
                <Tooltip title="Descrição" arrow>
                  <IconButton
                    onClick={() => handleOpen(item, "desc")}
                    color="inherit"
                  >
                    <DescriptionRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Adicionar ao carrinho" arrow>
                  <IconButton
                    onClick={() => handleOpen(item, "add")}
                    color="inherit"
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
        {/* MODAL */}
        <ProductModal
          open={open}
          onClose={handleClose}
          item={activeItem}
          mode={mode}
          onConfirm={(item, quantity) => {
            console.log("Produto:", item);
            console.log("Quantidade:", quantity);
            // aqui pode adicionar ao carrinho ou mandar pro contexto
          }}
        />
      </div>
    </div>
  );
}

export default Home;
