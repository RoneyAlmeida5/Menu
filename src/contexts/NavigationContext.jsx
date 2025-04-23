import React, { createContext, useState, useContext } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("Bolos");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const updateSelectedTitle = (title) => {
    setSelectedTitle(title);
  };

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        selectedTitle,
        updateSelectedTitle,
        searchTerm,
        updateSearchTerm,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
