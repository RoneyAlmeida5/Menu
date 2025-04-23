import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/Logo.png";
import ThemeToggle from "../components/ThemeToggle";
import { FiLogIn } from "react-icons/fi";
import { MdOutlineRestaurantMenu, MdNoDrinks } from "react-icons/md";
import {
  GiCakeSlice,
  GiHamburger,
  GiPotato,
  GiChickenOven,
} from "react-icons/gi";
import { BiSolidFoodMenu } from "react-icons/bi";
import { useNavigation } from "../contexts/NavigationContext";

function Header() {
  const headerRef = useRef(null);
  const { isSidebarOpen, toggleSidebar } = useNavigation();

  const menuItems = [
    { name: "Menu Completo", icon: <BiSolidFoodMenu /> },
    { name: "Bolos", icon: <GiCakeSlice /> },
    { name: "Hambürger", icon: <GiHamburger /> },
    { name: "Acompanhamentos", icon: <MdOutlineRestaurantMenu /> },
    { name: "Entradas", icon: <FiLogIn /> },
    { name: "Batatas", icon: <GiPotato /> },
    { name: "Frangos", icon: <GiChickenOven /> },
    { name: "Bebidas", icon: <MdNoDrinks /> },
  ];

  useEffect(() => {
    const headerElement = headerRef.current;

    const handleMouseEnter = () => {
      toggleSidebar(true);
    };

    const handleMouseLeave = () => {
      toggleSidebar(false);
    };

    if (headerElement) {
      headerElement.addEventListener("mouseenter", handleMouseEnter);
      headerElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (headerElement) {
        headerElement.removeEventListener("mouseenter", handleMouseEnter);
        headerElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [toggleSidebar]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 h-full z-10 bg-gray-900 dark:bg-gray-900 dark:text-white text-black p-4 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-17"
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
              {isSidebarOpen && <span>{item.name}</span>}{" "}
              {/* Use o estado do contexto */}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
