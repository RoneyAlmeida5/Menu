import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </CartProvider>
  </React.StrictMode>
);
