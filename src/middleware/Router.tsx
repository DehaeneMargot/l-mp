import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from '../pages/Home';
import About from '../pages/About';
import Products from '../pages/Products';
import ProductDetail from "../pages/ProductDetail";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="lamps" element={<Products />} />
        <Route path="lamps/detail" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}


export default Router;