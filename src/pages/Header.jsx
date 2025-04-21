import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import ThemeToggle from "../components/ThemeToggle";
import {
  FiMenu,
  FiGift,
  FiShoppingCart,
  FiLayers,
  FiLogIn,
  FiTag,
  FiCoffee,
  FiTrash2,
} from "react-icons/fi";

function Header() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => setShowNav(e.clientX < 50);
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const menuItems = [
    { name: "Menu completo", icon: <FiMenu /> },
    { name: "Bolos", icon: <FiGift /> },
    { name: "Hambürger", icon: <FiShoppingCart /> },
    { name: "Acompanhamentos", icon: <FiLayers /> },
    { name: "Entradas", icon: <FiLogIn /> },
    { name: "Batatas", icon: <FiTag /> },
    { name: "Frangas", icon: <FiCoffee /> },
    { name: "Bebidas", icon: <FiCoffee /> },
    { name: "Descartáveis", icon: <FiTrash2 /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 h-full z-10 bg-gray-900 dark:bg-gray-900 dark:text-white text-black p-4 transition-all duration-300 ${
        showNav ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-center mb-6 ml-4">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center mb-6">
        <img src={Logo} className="w-40 h-40 object-contain" alt="Logo" />
      </div>
      <nav>
        <ul className="flex flex-col gap-3">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                item.name === "Bolos"
                  ? "bg-gray-700 text-white dark:bg-gray-600"
                  : "text-gray-400 hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {showNav && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
