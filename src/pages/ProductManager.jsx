import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import Header from "./Header";
import Logo from "../assets/Logo.png";
import SearchBar from "../components/HeaderSearchComponents/SearchBar";

// IMPORTS
import axios from "axios";
import { useProducts } from "../contexts/ProductsContext";
import { useNavigation } from "../contexts/NavigationContext";
import { useNavigate } from "react-router";
import BannerPromo from "../components/HomeComponents/BannerPromo";
import CardProductsManager from "../components/ProductManager/CardProductsManager";
import ProductFormModal from "../components/ProductManager/ProductFormModal";
import MenuFormModal from "../components/ProductManager/MenuFormModal";

const ProductManager = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  // MODAL
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const [openModalProduct, setOpenModalProduct] = useState(false);
  // BANNER
  const [bannerFile, setBannerFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedPath, setUploadedPath] = useState("");
  // LOGO
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [company, setCompany] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
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
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const params = {};
      if (selectedMenu.name !== "Menu Completo") {
        params.menuId = selectedMenu.id;
      }

      const res = await axios.get("http://localhost:3000/product", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setProducts(res.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  // BANNER PROMO
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBannerFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleUpload = async () => {
    if (!bannerFile) return;

    const formData = new FormData();
    formData.append("banner", bannerFile);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/companies/banner",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadedPath(response.data.path);
      alert("Banner enviado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar banner.");
    }
  };

  // LOGO COMPANY
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };
  const handleUploadLogo = async () => {
    if (!logoFile) return;

    const formData = new FormData();
    formData.append("image", logoFile);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://localhost:3000/companies/logo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Logo enviada com sucesso!");
      setCompany((prev) => ({ ...prev, image: response.data.path }));
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar logo.");
    }
  };

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
    name: "",
    value: "",
    image: "",
    description: "",
    menuIds: [],
  });
  useEffect(() => {
    fetchProducts();
  }, [selectedMenu]);
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
  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };
  const handleSaveProduct = async () => {
    if (!productForm.name.trim() || !productForm.value) {
      alert("Preencha nome e preço.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("value", productForm.value);
    formData.append("description", productForm.description);
    formData.append("companyId", company.id);

    const transformMenuIdsinAny = productForm.menuIds;
    const menuIdsArray = Array.isArray(transformMenuIdsinAny)
      ? transformMenuIdsinAny
      : typeof transformMenuIdsinAny === "number"
      ? [transformMenuIdsinAny]
      : [];

    formData.append("menuIds", JSON.stringify(menuIdsArray));

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    const token = localStorage.getItem("token");
    console.log("Enviando dados:", productForm);

    try {
      if (productForm.id) {
        // EDIÇÃO (PUT)
        await axios.put(
          `http://localhost:3000/product/${productForm.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // CRIAÇÃO (POST)
        await axios.post("http://localhost:3000/product", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchProducts();
      setOpenModalProduct(false);
      setProductForm({
        id: null,
        name: "",
        value: "",
        image: "",
        description: "",
        menuIds: [],
      });
      setSelectedImage(null);
    } catch (error) {
      console.error(
        "Erro ao salvar produto com imagem:",
        error.response?.data || error.message
      );
    }
  };
  const handleEditProduct = (product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      value: product.value,
      description: product.description,
      image: product.image,
      menuIds: Array.isArray(product.menus)
        ? product.menus.map((m) => m.id)
        : [],
    });
    setOpenModalProduct(true);
  };
  const handleDeleteProduct = async (product) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/product/${product.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      console.log("Produto deletado");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const backgroundClass =
    theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black";

  return (
    <div
      className={`${
        isSidebarOpen ? "ml-64" : "ml-0 sm:ml-20"
      } mt-4 ${backgroundClass} mb-9 rounded-2xl transition-all duration-300 h-full min-h-screen`}
    >
      <div className="flex flex-row mb-4">
        <div className="flex flex-col items-center space-y-6 max-w-sm mx-auto p-6 rounded-xl shadow-md">
          <label className="text-lg font-semibold text-gray-100">
            Alterar Logo da Empresa
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="cursor-pointer border border-gray-300 rounded-md p-2 w-full text-sm text-gray-400
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-green-600 file:text-white
               hover:file:bg-green-700
               transition-colors duration-300"
          />

          {logoPreview && (
            <img
              src={logoPreview}
              alt="Prévia da logo"
              className="w-28 h-28 object-cover rounded-full border-4 border-green-600 shadow-lg"
            />
          )}

          <button
            onClick={handleUploadLogo}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md
               transition-colors duration-300"
          >
            Enviar Logo
          </button>
        </div>
        <img
          src={company?.image ? `http://localhost:3000${company.image}` : Logo}
          alt="Logo"
          className="w-15 sm:w-28 mt-2 mb-1 h-auto object-contain rounded-xl"
        />
        <div className="flex flex-col items-center space-y-6 max-w-md mx-auto p-5 rounded-xl shadow-md">
          <label className="text-lg font-semibold text-gray-100">
            Alterar Logo da Empresa
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="
      cursor-pointer
      border border-gray-300 rounded-md p-2 w-full text-sm text-gray-600
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-600 file:text-white
      hover:file:bg-blue-700
      transition-colors duration-300
       "
          />

          {preview && (
            <img
              src={preview}
              alt="Prévia"
              className="w-full h-64 object-cover rounded-lg shadow-lg border border-gray-200"
            />
          )}

          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md
       transition-colors duration-300"
          >
            Enviar Banner
          </button>
        </div>
      </div>

      <Header theme={theme} setTheme={setTheme} />

      <div className="overflow-y-auto px-4 sm:px-6 pb-6">
        <div className="mb-5 mt-1">
          <SearchBar onSearch={handleSearch} theme={theme} />
        </div>

        <BannerPromo company={company} />

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
                  name: "",
                  value: "",
                  image: "",
                  description: "",
                  menuIds: [],
                });
                setSelectedImage(null);
                setOpenModalProduct(true);
              }}
              className="mr-3 w-[50px] h-[50px] bg-green-700 my-1 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#00611f] before:to-[rgb(190, 190, 190)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white"
            >
              <AddShoppingCartIcon />
            </button>
          </Tooltip>
          <Tooltip title="Sair" placement="bottom">
            <button
              onClick={handleLogout}
              className="w-[50px] h-[50px] bg-red-700 my-1 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#8B0000] before:to-[rgb(190, 190, 190)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white"
            >
              <LogoutIcon />
            </button>
          </Tooltip>
        </div>
        <ProductFormModal
          productForm={productForm}
          setProductForm={setProductForm}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleChangeProduct={handleChangeProduct}
          handleSaveProduct={handleSaveProduct}
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

        <div className="grid md:grid-cols-4 gap-4">
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
