import React, { useState, useEffect } from "react";
import ProductModal from "../components/ProductModal";
import ListProducts from "../components/ListProducts";
import BannerPromo from "../components/BannerPromo";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "../contexts/NavigationContext";
// IMAGE
import BannerCard from "../assets/bannercard.jpeg";

function Home() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("desc");
  const [activeItem, setActiveItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isSidebarOpen, selectedTitle, searchTerm } = useNavigation();

  const initialItems = Array.from({ length: 1 }, (_, i) => ({
    id: 1,
    title: "Bolo de Chocolate com Morango",
    price: "R$ 49,90",
    img: BannerCard,
    description:
      "Delicioso bolo de chocolate com morango fresco e cobertura cremosa.",
  }));

  initialItems.push({
    id: 7,
    title: "Hambúrguer Clássico",
    price: "R$ 29,90",
    img: "https://blog.biglar.com.br/wp-content/uploads/2024/08/iStock-1398630614.jpg",
    description:
      "Um delicioso hambúrguer com carne suculenta, queijo, alface e tomate.",
  });

  initialItems.push({
    id: 8,
    title: "Sorvete Napolitano",
    price: "R$ 19,90",
    img: "https://blog.gsuplementos.com.br/wp-content/uploads/2020/11/iStock-1173381958.jpg",
    description: "Sortevete bem gelado e com 3 cores",
  });

  const filteredItems = initialItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpen = (item, action) => {
    setActiveItem(item);
    setMode(action);
    setQuantity(1);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div
      className={`${
        isSidebarOpen ? "ml-64" : "ml-20"
      } mt-20 bg-gray-700 text-white mb-4 pt-6 rounded-2xl transition-all duration-300 h-[calc(100vh-6rem)]`}
    >
      <div className="h-full overflow-y-auto px-6 pb-6">
        <BannerPromo />
        <h2 className="text-2xl font-semibold mb-4">
          {searchTerm ? `Pesquisa: ${searchTerm}` : selectedTitle}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <ListProducts key={item.id} item={item} handleOpen={handleOpen} />
          ))}
        </div>
        <ProductModal
          open={open}
          onClose={handleClose}
          item={activeItem}
          mode={mode}
          onConfirm={(item, quantity) => {
            addToCart(item, quantity);
          }}
        />
      </div>
    </div>
  );
}

export default Home;
