import React, { useState } from "react";
import ProductModal from "../components/HomeComponents/ProductModal";
import CardProducts from "../components/HomeComponents/CardProducts";
import BannerPromo from "../components/HomeComponents/BannerPromo";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "../contexts/NavigationContext";
import { useProducts } from "../contexts/ProductsContext";

function Home({ theme }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("desc");
  const [activeItem, setActiveItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isSidebarOpen, selectedTitle, searchTerm } = useNavigation();

  const { products } = useProducts();
  const filteredItems = products.filter((item) => {
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
      } mt-20 ${backgroundClass} mb-9 pt-6 rounded-2xl transition-all duration-300 h-full min-h-screen`}
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
