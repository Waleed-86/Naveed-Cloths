import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter } from 'lucide-react'

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
            <Link to="/" className="font-display text-2xl">SILA</Link>
            <p className="mt-3 max-w-[220px] text-sm text-ivory/70">
              Premium Pakistani fashion, stitched with intention — from our house to yours.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="rounded-full border border-ivory/25 p-2 hover:border-gold hover:text-gold">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full border border-ivory/25 p-2 hover:border-gold hover:text-gold">
                <Facebook size={16} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-full border border-ivory/25 p-2 hover:border-gold hover:text-gold">
                <Twitter size={16} strokeWidth={1.5} />
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
          <p>© {new Date().getFullYear()} SILA. All rights reserved.</p>
          <p>Cash on Delivery · JazzCash · Easypaisa · Bank Transfer · Cards</p>
        </div>
      </div>
    </footer>
  )
}