import React, { createContext, useContext, useState } from "react";
import BannerCard from "../assets/bannercard.jpeg";

const ProductsContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: "Bolo de Chocolate com Morango",
    value: "49,90",
    img: BannerCard,
    description:
      "Delicioso bolo de chocolate com morango fresco e cobertura cremosa de avelã.",
    category: "Bolos",
  },
  {
    id: 7,
    name: "Hambúrguer Clássico",
    value: "29,90",
    img: "https://blog.biglar.com.br/wp-content/uploads/2024/08/iStock-1398630614.jpg",
    description:
      "Um delicioso hambúrguer com carne suculenta, queijo, alface e tomate.",
    category: "Hamburger",
  },
  {
    id: 8,
    name: "Sorvete Napolitano",
    value: "19,90",
    img: "https://blog.gsuplementos.com.br/wp-content/uploads/2020/11/iStock-1173381958.jpg",
    description: "Sorvete Cremoso",
    category: "Bebidas",
  },
];

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (newProduct) => {
    const newId = Math.max(0, ...products.map((p) => p.id)) + 1;
    setProducts([...products, { ...newProduct, id: newId }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
