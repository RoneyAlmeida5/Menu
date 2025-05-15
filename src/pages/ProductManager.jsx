import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Header from "./Header";
import Logo from "../assets/Logo.png";
import SearchBar from "../components/HeaderSearchComponents/SearchBar";

// IMPORTS
import axios from "axios";
import { useProducts } from "../contexts/ProductsContext";
import { useNavigation } from "../contexts/NavigationContext";
import BannerPromo from "../components/HomeComponents/BannerPromo";
import CardProductsManager from "../components/ProductManager/CardProductsManager";
import ProductFormModal from "../components/ProductManager/ProductFormModal";

const ProductManager = ({ theme, setTheme }) => {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState();
  const { products, setProducts, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const { isSidebarOpen, selectedTitle, searchTerm, updateSearchTerm } =
    useNavigation();
  const handleSearch = (term) => updateSearchTerm(term);

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

  // EFFECT PARA REQ DE PRODUTOS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            menuId:
              selectedTitle !== "Menu Completo" ? selectedTitle : undefined,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProducts();
  }, [selectedTitle]);

  const [form, setForm] = useState({
    id: null,
    title: "",
    price: "",
    img: "",
    description: "",
    category: "",
  });

  const filteredItems = products.filter((item) => {
    const title = item?.title || "";
    const category = item?.category || "";

    const matchesSearch = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedTitle === "Menu Completo" || category === selectedTitle;

    return matchesSearch && matchesCategory;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    if (!form.title || !form.price) return;

    if (form.id) {
      updateProduct(form);
    } else {
      addProduct(form);
    }

    setForm({
      id: null,
      title: "",
      price: "",
      img: "",
      description: "",
      category: "",
    });
  };

  const handleEdit = (product) => {
    setForm(product);
    setOpen(true);
  };

  const handleDelete = (product) => {
    deleteProduct(product.id);
  };

  const backgroundClass =
    theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black";

  return (
    <div
      className={`${
        isSidebarOpen ? "ml-64" : "ml-0 sm:ml-20"
      } mt-4 ${backgroundClass} mb-9 rounded-2xl transition-all duration-300 h-full min-h-screen`}
    >
      <div className="flex items-center justify-center">
        <img
          src={company?.image ? `http://localhost:3000${company.image}` : Logo}
          alt="Logo"
          className="w-12 sm:w-16 h-auto object-contain"
        />
      </div>
      <Header theme={theme} setTheme={setTheme} />

      <div className="overflow-y-auto px-4 sm:px-6 pb-6">
        <div className="mb-5 mt-1">
          <SearchBar onSearch={handleSearch} theme={theme} />
        </div>
        <BannerPromo />
        <div className="flex items-center justify-center">
          <Tooltip title="Adicionar Produto" placement="bottom">
            <button
              onClick={() => {
                setForm({
                  id: null,
                  title: "",
                  price: "",
                  img: "",
                  description: "",
                  category: "",
                });
                setOpen(true);
              }}
              className="mr-3 w-[50px] h-[50px] bg-green-700 my-1 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#00611f] before:to-[rgb(190, 190, 190)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </Tooltip>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          {searchTerm ? `Pesquisa: ${searchTerm}` : selectedTitle}
        </h2>

        <ProductFormModal
          form={form}
          setForm={setForm}
          handleChange={handleChange}
          handleSave={handleSave}
          open={open}
          setOpen={setOpen}
          theme={theme}
        />
        <div className="grid md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <CardProductsManager
              key={item.id}
              item={item}
              onEdit={() => {
                handleEdit(item);
              }}
              onDelete={() => handleDelete(item)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
