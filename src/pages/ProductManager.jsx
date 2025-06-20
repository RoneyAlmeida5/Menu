import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import LogoutIcon from "@mui/icons-material/Logout";
import Header from "./Header";
import Logo from "../assets/Logo.png";
import SearchBar from "../components/HeaderSearchComponents/SearchBar";

// API
import {
  fetchCompany,
  fetchProducts as fetchProductsFromApi,
  uploadBanner,
  uploadLogo,
  createMenu,
  updateMenu as apiUpdateMenu,
  createProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  getImageUrl,
} from "../services/api";

// IMPORTS
import axios from "axios";
import toast from "react-hot-toast";
import LoadingModals from "../components/ProductManager/LoadingModals";
import { useProducts } from "../contexts/ProductsContext";
import { useNavigation } from "../contexts/NavigationContext";
import { useNavigate } from "react-router";
import BannerPromo from "../components/HomeComponents/BannerPromo";
import CardProductsManager from "../components/ProductManager/CardProductsManager";
import ProductFormModal from "../components/ProductManager/ProductFormModal";
import MenuFormModal from "../components/ProductManager/MenuFormModal";
import ImageUploadModal from "../components/ProductManager/ImageUploadModal";

const ProductManager = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  // MODAL
  const [openModalMenu, setOpenModalMenu] = useState(false);
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [openModalImageModal, setOpenModalImageModal] = useState(false);
  // BANNER
  const [bannerFile, setBannerFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedPath, setUploadedPath] = useState("");
  // LOGO
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [company, setCompany] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const { products, setProducts } = useProducts();
  const {
    isSidebarOpen,
    selectedMenu,
    searchTerm,
    updateSearchTerm,
    triggerMenuRefresh,
  } = useNavigation();
  const handleSearch = (term) => updateSearchTerm(term);

  // EFFECT PARA REQ DA IMAGE
  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await fetchCompany();
        setCompany(data);
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
      }
    };
    loadCompany();
  }, []);

  // EFFECT PARA REQ DE PRODUTOS
  const fetchProducts = async () => {
    try {
      const menuId =
        selectedMenu?.name !== "Menu Completo" ? selectedMenu?.id : null;
      const data = await fetchProductsFromApi(menuId);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setProducts([]);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [selectedMenu]);

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
    try {
      const result = await uploadBanner(formData);
      setUploadedPath(result.path);
    } catch (err) {
      console.error(err);
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
    try {
      const result = await uploadLogo(formData);
      setCompany((prev) => ({ ...prev, image: result.path }));
    } catch (err) {
      console.error(err);
    }
  };

  // LOGICA PARA MENU (ADD/EDIT/DELET)
  const [menuForm, setMenuForm] = useState({
    id: null,
    name: "",
  });
  const addMenu = async (menu) => {
    await toast.promise(
      createMenu({ ...menu, companyId: company.id }).then(triggerMenuRefresh),
      {
        loading: <LoadingModals />,
        success: "Menu adicionado com sucesso!",
        error: "Erro ao adicionar menu. Tente novamente.",
      }
    );
  };
  const handleSaveMenu = async () => {
    if (!menuForm.name) return toast.error("Insira o nome do menu.");
    if (menuForm.id) {
      await updateMenu(menuForm);
    } else {
      await addMenu(menuForm);
    }
    setOpenModalMenu(false);
    setMenuForm({ id: null, name: "" });
  };
  const updateMenu = async (menu) => {
    await toast.promise(apiUpdateMenu(menu.id, menu).then(triggerMenuRefresh), {
      loading: <LoadingModals />,
      success: "Menu atualizado com sucesso!",
      error: "Erro ao atualizar menu. Tente novamente.",
    });
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
    const menuIdsArray = Array.isArray(productForm.menuIds)
      ? productForm.menuIds
      : typeof productForm.menuIds === "number"
      ? [productForm.menuIds]
      : [];
    formData.append("menuIds", JSON.stringify(menuIdsArray));
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    try {
      if (productForm.id) {
        await apiUpdateProduct(productForm.id, formData);
      } else {
        await createProduct(formData);
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
      console.error("Erro ao salvar produto com imagem:", error);
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
    await toast.promise(apiDeleteProduct(product.id).then(fetchProducts), {
      loading: "Excluindo produto...",
      success: "Produto excluído com sucesso!",
      error: "Erro ao excluir produto. Tente novamente.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const logoUrl = company?.image ? getImageUrl(company.image) : Logo;

  const backgroundClass =
    theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black";

  return (
    <div
      className={`${
        isSidebarOpen ? "ml-64" : "ml-0 sm:ml-20"
      } mt-4 ${backgroundClass} mb-9 rounded-2xl transition-all duration-300 h-full min-h-screen`}
    >
      <div className="flex justify-center items-center">
        <img
          src={logoUrl}
          alt="Logo"
          className="flex justify-center items-center w-15 sm:w-20 mt-2 mb-1 h-auto object-contain rounded-xl"
        />
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
          <Tooltip title="Gerenciar Logo e Banner" placement="bottom">
            <button
              onClick={() => setOpenModalImageModal(true)}
              className="mr-3 w-[50px] h-[50px] bg-blue-700 my-1 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#244cde] before:to-[rgb(190, 190, 190)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white"
            >
              <EditSquareIcon />
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
        <ImageUploadModal
          isOpen={openModalImageModal}
          onClose={() => setOpenModalImageModal(false)}
          theme={theme}
          logoFile={logoFile}
          setLogoFile={setLogoFile}
          logoPreview={logoPreview}
          setLogoPreview={setLogoPreview}
          handleLogoChange={handleLogoChange}
          handleUploadLogo={handleUploadLogo}
          bannerFile={bannerFile}
          setBannerFile={setBannerFile}
          preview={preview}
          setPreview={setPreview}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          openModalImageModal={openModalImageModal}
          setOpenModalImageModal={setOpenModalImageModal}
          company={company}
        />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
