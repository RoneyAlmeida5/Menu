import React, { useState, useEffect } from "react";
import ProductModal from "../components/HomeComponents/ProductModal";
import CardProducts from "../components/HomeComponents/CardProducts";
import BannerPromo from "../components/HomeComponents/BannerPromo";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "../contexts/NavigationContext";
import { useProducts } from "../contexts/ProductsContext";
import { useUser } from "../contexts/UserContext";
import axios from "axios";

function Home({ theme }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("desc");
  const [company, setCompany] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { addToCart } = useCart();
  const { isSidebarOpen, searchTerm, updateSearchTerm, selectedMenu } =
    useNavigation();
  const handleSearch = (term) => updateSearchTerm(term);
  const { products, setProducts } = useProducts();

  // EFFECT PARA REQ DA IMAGE
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/companies/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompany(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
      }
    };

    fetchCompany();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = {};

      if (selectedMenu?.name && selectedMenu.name !== "Menu Completo") {
        params.menuId = selectedMenu.id;
      }

      const res = await axios.get("http://localhost:3000/product", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err.response || err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredItems = products.filter((item) => {
    const title = item?.name || "";
    const menuName = selectedMenu?.name || "Menu Completo";

    const matchesSearch = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const categoryMatch =
      menuName === "Menu Completo" ||
      item.menus?.some((menu) => menu.name === menuName);

    return matchesSearch && categoryMatch;
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
        <BannerPromo company={company} />
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          {searchTerm ? `Pesquisa: ${searchTerm}` : selectedMenu?.name}
        </h2>

        {loading ? (
          <p className="text-center">Carregando produtos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <CardProducts
                key={item.id}
                item={item}
                handleOpen={handleOpen}
                theme={theme}
              />
            ))}
          </div>
        )}

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
