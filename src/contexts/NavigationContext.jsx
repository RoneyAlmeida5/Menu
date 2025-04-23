import React, { createContext, useState, useContext } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <NavigationContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </NavigationContext.Provider>
  );
};
