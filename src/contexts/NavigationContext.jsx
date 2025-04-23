import React, { createContext, useState, useContext } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("Bolos");

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const updateSelectedTitle = (title) => {
    setSelectedTitle(title);
  };

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        selectedTitle,
        updateSelectedTitle,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
