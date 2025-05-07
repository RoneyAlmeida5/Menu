import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);
