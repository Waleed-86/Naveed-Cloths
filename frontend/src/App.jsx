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
import AccountLayout, { AddressesPlaceholder, ChangePasswordPlaceholder } from './pages/account/AccountLayout.jsx'
import Profile from './pages/account/Profile.jsx'
import Orders from './pages/account/Orders.jsx'
import TrackOrder from './pages/TrackOrder.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import PolicyPage from './pages/PolicyPage.jsx'
import { POLICY_CONTENT } from './data/policyContent.js'
import RequireAdmin from './components/auth/RequireAdmin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminOrders from './pages/admin/AdminOrders.jsx'
import AdminProducts from './pages/admin/AdminProducts.jsx'
import AdminProductForm from './pages/admin/AdminProductForm.jsx'
import AdminCategories from './pages/admin/AdminCategories.jsx'
import AdminCustomers from './pages/admin/AdminCustomers.jsx'
import AdminCustomerDetail from './pages/admin/AdminCustomerDetail.jsx'
import AdminReviews from './pages/admin/AdminReviews.jsx'

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
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
      <Route path="/track-order" element={<TrackOrder />} />
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
        <Route path="orders" element={<Orders />} />
        <Route path="addresses" element={<AddressesPlaceholder />} />
        <Route path="change-password" element={<ChangePasswordPlaceholder />} />
      </Route>
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:id/edit" element={<AdminProductForm />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="customers/:id" element={<AdminCustomerDetail />} />
        <Route path="reviews" element={<AdminReviews />} />
      </Route>
      <Route path="/privacy-policy" element={<PolicyPage policy={POLICY_CONTENT.privacy} />} />
      <Route path="/terms-and-conditions" element={<PolicyPage policy={POLICY_CONTENT.terms} />} />
      <Route path="/refund-policy" element={<PolicyPage policy={POLICY_CONTENT.refund} />} />
      <Route path="/shipping-policy" element={<PolicyPage policy={POLICY_CONTENT.shipping} />} />
      <Route path="*" element={<Placeholder label="404 — Page Not Found" />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}