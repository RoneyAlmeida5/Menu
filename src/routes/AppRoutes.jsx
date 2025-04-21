// PAGES
import Header from "../pages/Header";
import HeaderSearch from "../pages/HeaderSearch";
import Home from "../pages/Home";

// ROUTES
import { BrowserRouter as Router, Routes, Route } from "react-router";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <HeaderSearch />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
