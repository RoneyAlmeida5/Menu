import React, { useState } from "react";

// IMPORTS
import { useProducts } from "../contexts/ProductsContext";
import { useNavigation } from "../contexts/NavigationContext";
import BannerPromo from "../components/HomeComponents/BannerPromo";
import CardProductsManager from "../components/ProductManager/CardProductsManager";
import ProductFormModal from "../components/ProductManager/ProductFormModal";

const ProductManager = ({ theme, setTheme }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { isSidebarOpen, selectedTitle, searchTerm } = useNavigation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    price: "",
    img: "",
    description: "",
    category: "",
  });

  const filteredItems = products.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedTitle === "Menu Completo" || item.category === selectedTitle;
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

  const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const backgroundClass =
    theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black";

  return (
    <div
      className={`${
        isSidebarOpen ? "ml-64" : "ml-0 sm:ml-22"
      } mt-21 ${backgroundClass} mb-9 pt-6 rounded-2xl transition-all duration-300 h-full min-h-screen`}
    >
      <div className="overflow-y-auto px-4 sm:px-6 pb-6">
        <h3 className="text-xl font-semibold mb-2">Banner de Promoção</h3>
        <BannerPromo />

        <div className="flex items-center justify-center">
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
            className="mr-3 w-[150px] bg-green-700 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#00611f] before:to-[rgb(0, 0, 0)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            Adicionar Produto
          </button>
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
