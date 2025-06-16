import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { FiImage } from "react-icons/fi";
import Select from "react-select";
import axios from "axios";

const ProductFormModal = ({
  productForm,
  setProductForm,
  selectedImage,
  setSelectedImage,
  handleChangeProduct,
  handleSaveProduct,
  openModalProduct,
  setOpenModalProduct,
  theme,
}) => {
  const [menus, setMenus] = useState([]);
  const isDark = theme === "dark";
  const baseClass = isDark ? "bg-gray-800 text-white" : "bg-white text-black";

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/menu", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenus(response.data);
      } catch (error) {
        console.error("Erro ao buscar menus:", error);
      }
    };

    fetchMenus();
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
          <div className="flex grid justify-center items-center mb-8">
            <h2 className="text-xl font-semibold text-center">
              {productForm?.id ? "Editar Produto" : "Adicionar Produto"}
            </h2>
            <p className="flex justify-center items-center text-gray-500">
              largura x altura [500x300]
            </p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                type="text"
                name="name"
                value={productForm?.name ?? ""}
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
                type="number"
                name="value"
                value={productForm?.value}
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
                name="image"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
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
              <Select
                isMulti
                name="menuIds"
                options={menus.map((menu) => ({
                  value: menu.id,
                  label: menu.name,
                }))}
                value={(productForm?.menuIds || [])
                  .map((id) => menus.find((menu) => menu.id === id))
                  .filter(Boolean)
                  .map((menu) => ({ value: menu.id, label: menu.name }))}
                onChange={(selectedOptions) =>
                  setProductForm({
                    ...productForm,
                    menuIds: selectedOptions.map((opt) => opt.value),
                  })
                }
                placeholder="Selecione um ou mais menus"
                className="w-full"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: isDark ? "#374151" : "white",
                    borderColor: isDark ? "#4B5563" : "#D1D5DB",
                    color: isDark ? "white" : "black",
                    minHeight: "44px",
                  }),
                  input: (base) => ({
                    ...base,
                    color: isDark ? "white" : "black",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: isDark ? "#1F2937" : "white",
                    color: isDark ? "white" : "black",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? isDark
                        ? "#4B5563"
                        : "#E5E7EB"
                      : isDark
                      ? "#1F2937"
                      : "white",
                    color: isDark ? "white" : "black",
                    cursor: "pointer",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: isDark ? "#4B5563" : "#E5E7EB",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: isDark ? "white" : "black",
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: isDark ? "white" : "black",
                    ":hover": {
                      backgroundColor: isDark ? "#9CA3AF" : "#D1D5DB",
                      color: "black",
                    },
                  }),
                }}
              />
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
