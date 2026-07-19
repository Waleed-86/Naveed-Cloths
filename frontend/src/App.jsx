import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTopButton from './components/layout/ScrollToTopButton.jsx'
import Home from './pages/Home.jsx'
import Men from './pages/Men.jsx'
import Women from './pages/Women.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ProductListPage from './pages/ProductListPage.jsx'
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'
import AccountLayout, { OrdersPlaceholder, AddressesPlaceholder, ChangePasswordPlaceholder } from './pages/account/AccountLayout.jsx'
import Profile from './pages/account/Profile.jsx'

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
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route
        path="/new-arrivals"
        element={<ProductListPage title="New Arrivals" subtitle="Just landed — the newest additions to our collections." apiParams={{ is_new: 1 }} />}
      />
      <Route
        path="/best-sellers"
        element={<ProductListPage title="Best Sellers" subtitle="The pieces our customers keep coming back for." apiParams={{ best_sellers: 1 }} />}
      />
      <Route
        path="/sale"
        element={<ProductListPage title="Sale" subtitle="Limited-time offers on select collections." apiParams={{ on_sale: 1 }} />}
      />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/about" element={<Placeholder label="About Us" />} />
      <Route path="/contact" element={<Placeholder label="Contact" />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
      <Route path="/track-order" element={<Placeholder label="Track Order" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/account"
        element={
          <RequireAuth>
            <AccountLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Profile />} />
        <Route path="orders" element={<OrdersPlaceholder />} />
        <Route path="addresses" element={<AddressesPlaceholder />} />
        <Route path="change-password" element={<ChangePasswordPlaceholder />} />
      </Route>
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