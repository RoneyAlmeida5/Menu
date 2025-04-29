import React, { useState } from "react";
import CartModal from "../components/HeaderSearchComponents/CartModal";
import ShoppingCartButton from "../components/HeaderSearchComponents/ShoppingCartButton";
import SearchBar from "../components/HeaderSearchComponents/SearchBar";
import { useNavigation } from "../contexts/NavigationContext";

const HeaderSearch = ({ theme }) => {
  const { isSidebarOpen, updateSearchTerm } = useNavigation();
  const [cartOpen, setCartOpen] = useState(false);

  const handleSearch = (term) => updateSearchTerm(term);
  const backgroundClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";

  // mesmo deslocamento da sidebar
  const leftOffset =
    typeof window !== "undefined" && window.innerWidth >= 640
      ? isSidebarOpen
        ? "16rem"
        : "4rem"
      : "0";

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${backgroundClass}`}
        style={{ left: leftOffset }}
      >
        <div className="flex w-full max-w-screen px-3 sm:px-6 items-center justify-between gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} theme={theme} />
          </div>
          <div className="flex-shrink-0">
            <ShoppingCartButton
              onCartClick={() => setCartOpen(true)}
              theme={theme}
            />
          </div>
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
