import React, { createContext, useState, useContext } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState({
    name: "Menu Completo",
    id: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const updateSelectedTitle = (menu) => {
    setSelectedMenu(menu);
  };

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        selectedMenu,
        updateSelectedTitle,
        searchTerm,
        updateSearchTerm,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
