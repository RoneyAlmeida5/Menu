import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <NavigationProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </NavigationProvider>
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);
