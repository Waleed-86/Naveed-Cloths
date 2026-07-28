import { useState } from 'react'
import { Link } from 'react-router-dom'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: "Men's Collection", to: '/men' },
      { label: "Women's Collection", to: '/women' },
      { label: 'New Arrivals', to: '/new-arrivals' },
      { label: 'Best Sellers', to: '/best-sellers' },
      { label: 'Sale', to: '/sale' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Track Order', to: '/track-order' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Shipping Policy', to: '/shipping-policy' },
      { label: 'Refund Policy', to: '/refund-policy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Terms & Conditions', to: '/terms-and-conditions' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    // TODO: wire to real newsletter endpoint once backend API is built
    setSubmitted(true)
  }

  return (
    <footer className="bg-emerald text-ivory">
      <div className="container-premium py-16">
        {/* Newsletter */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-ivory/15 pb-14 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-gold-light">Stay in thread</p>
            <h3 className="mt-2 max-w-md font-display text-display-md">
              Join our list for early access to new collections.
            </h3>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ivory/30 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/50 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-gold px-6 py-3 text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:bg-gold-light"
            >
              {submitted ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="font-display text-2xl">Naveed Cloths</Link>
            <p className="mt-3 max-w-[220px] text-sm text-ivory/70">
              Premium Pakistani fashion, stitched with intention — from our house to yours.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="rounded-full border border-ivory/25 p-2 hover:border-gold hover:text-gold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full border border-ivory/25 p-2 hover:border-gold hover:text-gold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v3H7v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="rounded-full border border-ivory/25 p-2 hover:border-gold hover:text-gold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1-.8-.8-1.8-1.3-3-1.3-2.3 0-4.1 1.9-4.1 4.1 0 .3 0 .6.1.9-3.4-.2-6.5-1.8-8.5-4.3-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.6 1.8 3.4-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.6 2 2.8 3.8 2.8-1.4 1.1-3.2 1.7-5.1 1.7-.3 0-.7 0-1-.1 1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
                </svg>
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-gold-light">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-ivory/75 hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-premium flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/60 md:flex-row">
          <p>© {new Date().getFullYear()} Naveed Cloths. All rights reserved.</p>
          <p>Cash on Delivery · JazzCash · Easypaisa · Bank Transfer · Cards</p>
        </div>
      </div>
    </footer>
  )
}