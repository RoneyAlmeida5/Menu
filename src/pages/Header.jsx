import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/Logo.png";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import { useNavigation } from "../contexts/NavigationContext";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import ThemeToggle from "../components/HeaderComponents/ThemeToggle";
import axios from "axios";

function Header({ theme, setTheme }) {
  const headerRef = useRef(null);
  const [showText, setShowText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSidebarOpen, toggleSidebar, updateSelectedTitle, selectedTitle } =
    useNavigation();
  const [menuItems, setMenuItems] = useState([]);
  const [company, setCompany] = useState(null);

  // EFFECT PARA REQ IMG COMPANY
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/companies/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompany(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
      }
    };

    fetchCompany();
  }, []);

  // EFFECT PARA REQ DE MENU
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/menu", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedMenus = response.data || [];

        const menusWithIcons = [
          {
            name: "Menu Completo",
            icon: <FiberSmartRecordIcon fontSize="small" />,
          },
          ...fetchedMenus.map((menu) => ({
            name: menu.name,
            icon: <FiberSmartRecordIcon fontSize="small" />,
          })),
        ];

        setMenuItems(menusWithIcons);
      } catch (error) {
        console.error("Erro ao buscar menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // EFFECT PARA MOBILE & WEB
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
        <button
          onClick={toggleMobileMenu}
          className="absolute left-4 text-2xl focus:outline-none"
        >
          {mobileMenuOpen ? <IoClose className="h-7 w-7 mb-105" /> : <HiMenu />}
        </button>
        <div className="flex items-center justify-center">
          <img
            src={
              company?.image ? `http://localhost:3000${company.image}` : Logo
            }
            alt="Logo"
            className="w-15 mr-2 object-contain"
          />
        </div>
        {!mobileMenuOpen && (
          <div className="absolute right-3">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        )}
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
          ${isSidebarOpen ? "w-64" : "w-17"} p-2 flex-col items-center
          ${baseClass}
        `}
      >
        <div className="mb-6">
          <img
            src={
              company?.image ? `http://localhost:3000${company.image}` : Logo
            }
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
export const categories = [
  "Bolos",
  "Hamburger",
  "Acompanhamentos",
  "Entradas",
  "Batatas",
  "Frangos",
  "Bebidas",
];

export default Header;
