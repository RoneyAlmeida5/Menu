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
  const [refreshMenus, setRefreshMenus] = useState(false);

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const updateSelectedTitle = (menu) => {
    setSelectedMenu(menu);
  };

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const triggerMenuRefresh = () => {
    setRefreshMenus((prev) => !prev);
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
        refreshMenus,
        triggerMenuRefresh,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
