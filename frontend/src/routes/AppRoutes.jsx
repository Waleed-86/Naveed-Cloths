import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../pages/customer/Login";
import Register from "../pages/customer/Register";
import Home from "../pages/customer/Home";
/**
 * Temporary placeholder — replaced module-by-module as each page is built
 * in its dedicated roadmap step (Homepage, Men's Collection, etc.).
 * Remove this import/usage once every route below has a real page component.
 */
function ComingSoon({ title }) {
  return (
    <div className="container-shop py-24 text-center">
      <h1 className="text-2xl font-semibold text-charcoal mb-2">{title}</h1>
      <p className="text-sm text-charcoal/60">This page is under construction.</p>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Core customer pages — built out module by module */}
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<ComingSoon title="Men's Collection" />} />
        <Route path="/women" element={<ComingSoon title="Women's Collection" />} />
        <Route path="/product/:slug" element={<ComingSoon title="Product Details" />} />
        <Route path="/search" element={<ComingSoon title="Search Results" />} />
        <Route path="/wishlist" element={<ComingSoon title="Wishlist" />} />
        <Route path="/cart" element={<ComingSoon title="Shopping Cart" />} />
        <Route path="/checkout" element={<ComingSoon title="Checkout" />} />
        <Route path="/orders" element={<ComingSoon title="My Orders" />} />
        <Route path="/orders/:orderNumber" element={<ComingSoon title="Order Tracking" />} />
        <Route path="/account" element={<ComingSoon title="My Account" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

        {/* Static/info pages */}
        <Route path="/about" element={<ComingSoon title="About Us" />} />
        <Route path="/contact" element={<ComingSoon title="Contact Us" />} />
        <Route path="/faq" element={<ComingSoon title="FAQ" />} />
        <Route path="/privacy-policy" element={<ComingSoon title="Privacy Policy" />} />
        <Route path="/terms" element={<ComingSoon title="Terms & Conditions" />} />

        {/* 404 */}
        <Route path="*" element={<ComingSoon title="Page Not Found" />} />
      </Route>

      {/* Admin routes will get their own AdminLayout (no Header/Footer/WhatsApp) — added in Admin Dashboard step */}
    </Routes>
  );
}