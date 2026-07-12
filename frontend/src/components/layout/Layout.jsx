import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatAppButton";

/**
 * Shared shell for every customer-facing page. Admin pages (Admin Dashboard
 * step) will use a separate AdminLayout — this one is customer-storefront only.
 */
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}