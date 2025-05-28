import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { FiImage } from "react-icons/fi";
import axios from "axios";

const ProductFormModal = ({
  productForm,
  setProductForm,
  handleChangeProduct,
  handleSaveProduct,
  openModalProduct,
  setOpenModalProduct,
  theme,
}) => {
  const [categories, setCategories] = useState([]);
  const isDark = theme === "dark";
  const baseClass = isDark ? "bg-gray-800 text-white" : "bg-white text-black";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/menu", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Menus recebidos:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleClose = () => setOpenModalProduct(false);

  const handleSaveAndClose = () => {
    handleSaveProduct();
    handleClose();
  };

  return (
    <Modal open={openModalProduct} onClose={handleClose}>
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`${baseClass} p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto`}
        >
          <h2 className="text-xl font-semibold mb-8 text-center">
            {productForm?.id ? "Editar Produto" : "Adicionar Produto"}
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                type="text"
                name="title"
                value={productForm?.title}
                onChange={handleChangeProduct}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "border-gray-300"
                } focus:outline-none focus:ring focus:border-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Preço</label>
              <input
                type="text"
                name="price"
                value={productForm?.price}
                onChange={handleChangeProduct}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "border-gray-300"
                } focus:outline-none focus:ring focus:border-blue-500`}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">Imagem</label>
              <input
                type="file"
                name="img"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProductForm({
                      ...productForm,
                      img: URL.createObjectURL(file),
                    });
                  }
                }}
                className={`cursor-pointer w-full px-3 py-2 border rounded-md ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "border-gray-300"
                } focus:outline-none focus:ring focus:border-blue-500`}
              />
              <FiImage
                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                size={20}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Menu</label>
              <select
                name="menuId"
                value={productForm?.menuId || ""}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    menuId: Number(e.target.value),
                  })
                }
                className={`w-full px-2 py-2 border rounded-md ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "border-gray-300"
                } focus:outline-none focus:ring focus:border-blue-500`}
              >
                <option value="">Selecione um Menu</option>
                {Array.isArray(categories) &&
                  categories.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Descrição
              </label>
              <textarea
                name="description"
                rows="3"
                value={productForm?.description}
                onChange={handleChangeProduct}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "border-gray-300"
                } focus:outline-none focus:ring focus:border-blue-500`}
              ></textarea>
            </div>
          </form>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleSaveAndClose}
              className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {productForm?.id ? "Atualizar" : "Salvar"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className={`cursor-pointer px-4 py-2 border rounded-md ${
                isDark
                  ? "text-white border-gray-500 hover:bg-gray-600"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductFormModal;
