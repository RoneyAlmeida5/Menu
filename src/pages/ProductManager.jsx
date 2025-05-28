import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
import MenuFormModal from "../components/ProductManager/MenuFormModal";

const ProductManager = ({ theme, setTheme }) => {
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [company, setCompany] = useState();
  const { products, setProducts, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const { isSidebarOpen, selectedMenu, searchTerm, updateSearchTerm } =
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

        const params = {};
        if (selectedMenu.name !== "Menu Completo") {
          params.menuId = selectedMenu.id;
        }

        const res = await axios.get("http://localhost:3000/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        });
        console.log("Requisição produtos com params:", params, selectedMenu);

        setProducts(res.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProducts();
  }, [selectedMenu]);

  // LOGICA PARA MENU (ADD/EDIT/DELET)
  const [menuForm, setMenuForm] = useState({
    id: null,
    name: "",
  });
  const addMenu = async (menu) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/menu",
        { ...menu, companyId: company.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Menu adicionado:", response.data);
    } catch (error) {
      console.error("Erro ao adicionar menu:", error);
    }
  };
  const handleSaveMenu = () => {
    if (!menuForm.name) return;

    if (menuForm.id) {
      updateMenu(menuForm);
    } else {
      addMenu(menuForm);
    }

    setMenuForm({
      id: null,
      name: "",
    });
  };
  const updateMenu = async (menu) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/menu/${menu.id}`,
        { ...menu },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Menu atualizado:", response.data);
    } catch (error) {
      console.error("Erro ao atualizar menu:", error);
    }
  };

  // LOGICA PARA PRODUTOS ADD/EDIT/DELET)
  const [productForm, setProductForm] = useState({
    id: null,
    title: "",
    price: "",
    img: "",
    description: "",
    menuId: "",
  });
  const filteredItems = products.filter((item) => {
    const title = item?.name || "";

    const matchesSearch = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const categoryMatch =
      selectedMenu.name === "Menu Completo" ||
      item.menus?.some((menu) => menu.name === selectedMenu.name);

    return matchesSearch && categoryMatch;
  });
  const handleChangeProdut = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };
  const handleSaveProduct = async () => {
    if (!productForm.title || !productForm.price) return;

    const token = localStorage.getItem("token");

    const data = {
      ...productForm,
      companyId: company.id,
    };

    try {
      if (productForm.id) {
        await axios.put(
          `http://localhost:3000/product/${productForm.id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Produto atualizado");
      } else {
        await axios.post("http://localhost:3000/product", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Produto criado");
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }

    setProductForm({
      id: null,
      title: "",
      price: "",
      description: "",
      img: "",
      menuId: "",
    });
  };
  const handleEditProduct = (product) => {
    setProductForm(product);
    setOpenModalProduct(true);
  };
  const handleDeleteProduct = (product) => {
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
          <Tooltip title="Adicionar Menu" placement="bottom">
            <button
              onClick={() => {
                setMenuForm({
                  id: null,
                  name: "",
                });
                setOpenModalMenu(true);
              }}
              className="mr-3 w-[50px] h-[50px] bg-green-700 my-1 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#00611f] before:to-[rgb(190, 190, 190)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white"
            >
              <MenuBookIcon />
            </button>
          </Tooltip>
          <Tooltip title="Adicionar Produto" placement="bottom">
            <button
              onClick={() => {
                setProductForm({
                  id: null,
                  title: "",
                  price: "",
                  img: "",
                  description: "",
                  category: "",
                });
                setOpenModalProduct(true);
              }}
              className="mr-3 w-[50px] h-[50px] bg-green-700 my-1 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#00611f] before:to-[rgb(190, 190, 190)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white"
            >
              <AddShoppingCartIcon />
            </button>
          </Tooltip>
        </div>
        <ProductFormModal
          productForm={productForm}
          setProductForm={setProductForm}
          handleChange={handleChangeProdut}
          handleSave={handleSaveProduct}
          openModalProduct={openModalProduct}
          setOpenModalProduct={setOpenModalProduct}
          theme={theme}
        />
        <MenuFormModal
          menuForm={menuForm}
          setMenuForm={setMenuForm}
          handleSaveMenu={handleSaveMenu}
          openModalMenu={openModalMenu}
          setOpenModalMenu={setOpenModalMenu}
          theme={theme}
        />
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          {searchTerm ? `Pesquisa: ${searchTerm}` : selectedMenu?.name}
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <CardProductsManager
              key={item.id}
              item={item}
              onEdit={() => {
                handleEditProduct(item);
              }}
              onDelete={() => handleDeleteProduct(item)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
