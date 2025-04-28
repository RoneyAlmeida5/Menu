import React, { useState } from "react";
// COMPONENTS & CONTEXT
import CartModal from "../components/CartModal";
import ShoppingCartButton from "../components/ShoppingCartButton";
import SearchBar from "../components/SearchBar";
import { useNavigation } from "../contexts/NavigationContext";

const HeaderSearch = ({ theme }) => {
  const { isSidebarOpen, updateSearchTerm } = useNavigation();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    updateSearchTerm(term);
  };

  const backgroundClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${backgroundClass}`}
        style={{ left: isSidebarOpen ? "16rem" : "5rem" }}
      >
        <div className="flex items-center justify-between w-full px-6">
          <SearchBar onSearch={handleSearch} theme={theme} />
          <ShoppingCartButton
            onCartClick={() => setCartOpen(true)}
            theme={theme}
          />
        </div>
      </div>
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        theme={theme}
      />
    </>
  );
};

export default HeaderSearch;
