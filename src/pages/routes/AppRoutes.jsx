// PAGES
import Header from "../Header";
import Home from "../Home";

// ROUTES
import { BrowserRouter as Router, Routes, Route } from "react-router";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
