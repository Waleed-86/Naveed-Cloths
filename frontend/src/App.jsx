import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTopButton from './components/layout/ScrollToTopButton.jsx'
import Home from './pages/Home.jsx'

// Temporary placeholder — each route below will be swapped for its real
// page component as we build them out, one confirmed file at a time.
function Placeholder({ label }) {
  return (
    <div className="container-premium flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <p className="eyebrow">Coming soon</p>
      <h1 className="text-display-md">{label}</h1>
      <div className="thread-divider max-w-[120px]" />
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/men" element={<Placeholder label="Men's Collection" />} />
      <Route path="/women" element={<Placeholder label="Women's Collection" />} />
      <Route path="/new-arrivals" element={<Placeholder label="New Arrivals" />} />
      <Route path="/best-sellers" element={<Placeholder label="Best Sellers" />} />
      <Route path="/sale" element={<Placeholder label="Sale" />} />
      <Route path="/product/:slug" element={<Placeholder label="Product" />} />
      <Route path="/about" element={<Placeholder label="About Us" />} />
      <Route path="/contact" element={<Placeholder label="Contact" />} />
      <Route path="/cart" element={<Placeholder label="Cart" />} />
      <Route path="/wishlist" element={<Placeholder label="Wishlist" />} />
      <Route path="/checkout" element={<Placeholder label="Checkout" />} />
      <Route path="/order-confirmation/:orderNumber" element={<Placeholder label="Order Confirmation" />} />
      <Route path="/track-order" element={<Placeholder label="Track Order" />} />
      <Route path="/login" element={<Placeholder label="Login" />} />
      <Route path="/register" element={<Placeholder label="Register" />} />
      <Route path="/account/*" element={<Placeholder label="Customer Dashboard" />} />
      <Route path="/admin/*" element={<Placeholder label="Admin Dashboard" />} />
      <Route path="/privacy-policy" element={<Placeholder label="Privacy Policy" />} />
      <Route path="/terms-and-conditions" element={<Placeholder label="Terms & Conditions" />} />
      <Route path="/refund-policy" element={<Placeholder label="Refund Policy" />} />
      <Route path="/shipping-policy" element={<Placeholder label="Shipping Policy" />} />
      <Route path="*" element={<Placeholder label="404 — Page Not Found" />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}