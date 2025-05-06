import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/Logo.png";
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
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import ThemeToggle from "../components/HeaderComponents/ThemeToggle";

function Header({ theme, setTheme }) {
  const headerRef = useRef(null);
  const [showText, setShowText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let t;
    if (!isMobile && isSidebarOpen)
      t = setTimeout(() => setShowText(true), 145);
    else setShowText(false);
    return () => clearTimeout(t);
  }, [isSidebarOpen, isMobile]);

  useEffect(() => {
    const el = headerRef.current;
    if (isMobile || !el) return;
    const enter = () => toggleSidebar(true);
    const leave = () => toggleSidebar(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [isMobile, toggleSidebar]);

  const handleClick = (name) => {
    updateSelectedTitle(name);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const baseClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";

  return (
    <>
      {/* --- MOBILE --- */}
      <header
        className={`
          sm:hidden fixed bottom-0 left-0 z-20 w-full transition-all duration-300
          flex items-center justify-center px-4
          ${
            mobileMenuOpen
              ? "h-auto flex-col items-stretch justify-between gap-2 py-4"
              : "h-14"
          }
          ${baseClass}
        `}
      >
        {/* Botão do Menu (à esquerda quando o menu está fechado) */}
        <button
          onClick={toggleMobileMenu}
          className="absolute left-4 text-2xl focus:outline-none"
        >
          {mobileMenuOpen ? <IoClose className="h-7 w-7 mb-105" /> : <HiMenu />}
        </button>

        {/* Logo Centralizada */}
        <div className="flex items-center justify-center">
          <img src={Logo} alt="Logo" className="w-15 mr-2 object-contain" />
        </div>

        {/* ThemeToggle (à direita quando o menu está fechado) */}
        {!mobileMenuOpen && (
          <div className="absolute right-3">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        )}

        {/* Navegação (aparece quando mobileMenuOpen é true) */}
        <nav className={`${!mobileMenuOpen && "hidden"} w-full mt-4`}>
          <ul className="flex flex-col gap-2 items-start w-full">
            {menuItems.map((item, i) => (
              <li
                key={i}
                onClick={() => handleClick(item.name)}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-200 w-full
            ${
              item.name === selectedTitle
                ? theme === "dark"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300 text-black"
                : theme === "dark"
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-200"
            }
          `}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* --- DESKTOP --- */}
      <header
        ref={headerRef}
        className={`
          hidden sm:flex fixed z-20 top-0 left-0 h-full transition-all duration-400
          ${isSidebarOpen ? "w-64" : "w-16"} p-2 flex-col items-center
          ${baseClass}
        `}
      >
        <div className="mb-6">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 sm:w-32 h-auto object-contain"
          />
        </div>
        <nav className="w-full flex-1 mt-1">
          <ul className="flex flex-col gap-3">
            {menuItems.map((item, i) => (
              <li
                key={i}
                onClick={() => handleClick(item.name)}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-200
                  ${
                    item.name === selectedTitle
                      ? theme === "dark"
                        ? "bg-gray-600 text-white"
                        : "bg-gray-300 text-black"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                {item.icon}
                {showText && <span>{item.name}</span>}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex mb-2 ml-3">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </header>
    </>
  );
}

export default Header;
