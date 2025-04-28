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

function Header({ theme, setTheme }) {
  const headerRef = useRef(null);
  const { isSidebarOpen, toggleSidebar, updateSelectedTitle, selectedTitle } =
    useNavigation();

  const menuItems = [
    { name: "Menu Completo", icon: <BiSolidFoodMenu /> },
    { name: "Bolos", icon: <GiCakeSlice /> },
    { name: "Hamburger", icon: <GiHamburger /> },
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

  const handleMenuItemClick = (itemName) => {
    updateSelectedTitle(itemName);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 h-full z-10 p-4 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-17"
      } ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <div className="flex items-center justify-center mb-6 ml-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
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
                item.name === selectedTitle
                  ? theme === "dark"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-300 text-black"
                  : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => handleMenuItemClick(item.name)}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
