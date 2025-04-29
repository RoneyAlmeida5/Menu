import React, { useState } from "react";
import ProductModal from "../components/HomeComponents/ProductModal";
import CardProducts from "../components/HomeComponents/CardProducts";
import BannerPromo from "../components/HomeComponents/BannerPromo";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "../contexts/NavigationContext";
import BannerCard from "../assets/bannercard.jpeg";

function Home({ theme }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("desc");
  const [activeItem, setActiveItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isSidebarOpen, selectedTitle, searchTerm } = useNavigation();

  const initialItems = [
    {
      id: 1,
      title: "Bolo de Chocolate com Morango",
      price: "R$ 49,90",
      img: BannerCard,
      description:
        "Delicioso bolo de chocolate com morango fresco e cobertura cremosa.",
      category: "Bolos",
    },
    {
      id: 7,
      title: "Hambúrguer Clássico",
      price: "R$ 29,90",
      img: "https://blog.biglar.com.br/wp-content/uploads/2024/08/iStock-1398630614.jpg",
      description:
        "Um delicioso hambúrguer com carne suculenta, queijo, alface e tomate.",
      category: "Hamburger",
    },
    {
      id: 8,
      title: "Sorvete Napolitano",
      price: "R$ 19,90",
      img: "https://blog.gsuplementos.com.br/wp-content/uploads/2020/11/iStock-1173381958.jpg",
      description: "Sorvete bem gelado e com 3 cores",
      category: "Bebidas",
    },
  ];

  const filteredItems = initialItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedTitle === "Menu Completo" || item.category === selectedTitle;
    return matchesSearch && matchesCategory;
  });

  const handleOpen = (item, action) => {
    setActiveItem(item);
    setMode(action);
    setQuantity(1);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const backgroundClass =
    theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black";

  return (
    <div
      className={`${
        isSidebarOpen ? "ml-64" : "ml-0 sm:ml-20"
      } mt-20 ${backgroundClass} mb-4 pt-6 rounded-2xl transition-all duration-300 h-full min-h-screen`}
    >
      <div className="overflow-y-auto px-4 sm:px-6 pb-6">
        <BannerPromo />
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          {searchTerm ? `Pesquisa: ${searchTerm}` : selectedTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <CardProducts
              key={item.id}
              item={item}
              handleOpen={handleOpen}
              theme={theme}
            />
          ))}
        </div>
        <ProductModal
          open={open}
          onClose={handleClose}
          item={activeItem}
          mode={mode}
          theme={theme}
          onConfirm={(item, quantity) => {
            addToCart(item, quantity);
          }}
        />
      </div>
    </div>
  );
}

export default Home;
