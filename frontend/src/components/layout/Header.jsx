import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/**
 * Sticky site header. Mobile-first: hamburger menu on small screens,
 * full nav row on desktop. Logo uses the display serif to set the tone
 * immediately; the thin gold stitch-line under the header echoes the
 * embroidery motif used across auth/product screens.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Men", to: "/men" },
    { label: "Women", to: "/women" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="container-shop flex items-center justify-between h-18 py-3">
        {/* Logo */}
        <Link to="/" className="font-display text-xl text-charcoal tracking-tight">
          Naveed <span className="text-accent">Cloths</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-charcoal/80 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-5">
          <Link to="/wishlist" className="hidden sm:inline-flex hover:text-accent transition-colors" aria-label="Wishlist">
            <Heart size={19} className="text-charcoal" strokeWidth={1.75} />
          </Link>
          <Link to="/cart" className="hover:text-accent transition-colors" aria-label="Cart">
            <ShoppingBag size={19} className="text-charcoal" strokeWidth={1.75} />
          </Link>
          <Link
            to={isAuthenticated ? "/account" : "/login"}
            className="hidden sm:inline-flex hover:text-accent transition-colors"
            aria-label={isAuthenticated ? "Account" : "Login"}
          >
            <User size={19} className="text-charcoal" strokeWidth={1.75} />
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Signature stitch-line divider instead of a plain border */}
      <div className="stitch-divider" />

      {/* Mobile nav drawer */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-b border-lightgrey">
          <div className="container-shop flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-3 text-sm text-charcoal border-b border-lightgrey last:border-b-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={isAuthenticated ? "/account" : "/login"}
              className="py-3 text-sm text-charcoal"
              onClick={() => setMenuOpen(false)}
            >
              {isAuthenticated ? "My Account" : "Login"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}