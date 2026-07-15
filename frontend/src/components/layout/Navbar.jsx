import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Search, Heart, User, ShoppingBag, Sun, Moon } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Men', to: '/men' },
  { label: 'Women', to: '/women' },
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Best Sellers', to: '/best-sellers' },
  { label: 'Sale', to: '/sale' },
]

// TODO: replace with real counts from the cart/wishlist store once it's built
const CART_COUNT = 0
const WISHLIST_COUNT = 0

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-emerald py-2 text-center text-xs tracking-wide text-ivory">
        Free delivery on orders over Rs. 5,000 — nationwide
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? 'border-stone-light/40 bg-ivory/90 backdrop-blur-md dark:bg-ink/90'
            : 'border-transparent bg-ivory dark:bg-ink'
        }`}
      >
        <div className="container-premium flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="thread-underline font-display text-2xl font-medium tracking-tight md:text-3xl">
            SILA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `thread-underline text-sm font-medium uppercase tracking-wide ${
                    isActive ? 'text-emerald dark:text-gold' : 'text-ink/80 dark:text-ivory/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-1 md:gap-2">
            <button aria-label="Search" className="rounded-full p-2 hover:bg-ivory-deep dark:hover:bg-ink-soft">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setIsDark((d) => !d)}
              className="rounded-full p-2 hover:bg-ivory-deep dark:hover:bg-ink-soft"
            >
              {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
            <Link to="/account" aria-label="Account" className="hidden rounded-full p-2 hover:bg-ivory-deep dark:hover:bg-ink-soft md:inline-flex">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative hidden rounded-full p-2 hover:bg-ivory-deep dark:hover:bg-ink-soft md:inline-flex">
              <Heart size={20} strokeWidth={1.5} />
              {WISHLIST_COUNT > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rani text-[10px] text-ivory">
                  {WISHLIST_COUNT}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative rounded-full p-2 hover:bg-ivory-deep dark:hover:bg-ink-soft">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {CART_COUNT > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rani text-[10px] text-ivory">
                  {CART_COUNT}
                </span>
              )}
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="ml-1 rounded-full p-2 hover:bg-ivory-deep dark:hover:bg-ink-soft lg:hidden"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-ivory p-6 shadow-cardHover dark:bg-ink">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-xl">Menu</span>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-ivory-deep dark:hover:bg-ink-soft">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl"
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="thread-divider my-2" />
              <Link to="/account" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-wide text-stone">
                Account
              </Link>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-wide text-stone">
                Wishlist
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}