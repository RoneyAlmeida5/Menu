// PAGES
import Header from "../pages/Header";
import HeaderSearch from "../pages/HeaderSearch";
import Home from "../pages/Home";

// ROUTES
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useEffect, useState } from "react";

const AppRoutes = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <Header theme={theme} setTheme={setTheme} />
      <HeaderSearch theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
