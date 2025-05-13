// IMPORTAÇÕES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// PAGES
import Header from "../pages/Header";
import HeaderSearch from "../pages/HeaderSearch";
import Home from "../pages/Home";
import ProductManager from "../pages/ProductManager";
import Login from "../pages/Login";

// COMPONENTE DE ROTA PROTEGIDA
import ProtectedRoute from "../components/ProtectedRoute";

const Layout = ({ children, theme, setTheme }) => (
  <>
    <Header theme={theme} setTheme={setTheme} />
    <HeaderSearch theme={theme} setTheme={setTheme} />
    {children}
  </>
);

const AppRoutes = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/management"
          element={
            <ProtectedRoute>
              <ProductManager theme={theme} setTheme={setTheme} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumers"
          element={
            <Layout theme={theme} setTheme={setTheme}>
              <Home theme={theme} setTheme={setTheme} />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
