import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore.js'

const NAV_ITEMS = [
  { label: 'Overview', to: '/admin', end: true, ready: true },
  { label: 'Orders', to: '/admin/orders', ready: true },
  { label: 'Products', to: '/admin/products', ready: true },
  { label: 'Categories', to: '/admin/categories', ready: true },
  { label: 'Customers', to: '/admin/customers', ready: true },
  { label: 'Reviews', to: '/admin/reviews', ready: true },
  { label: 'Coupons', to: '/admin/coupons', ready: false },
  { label: 'Homepage & Banners', to: '/admin/homepage', ready: false },
  { label: 'Reports', to: '/admin/reports', ready: false },
]

export default function AdminLayout() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-ivory-deep dark:bg-ink">
      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-stone-light/40 bg-ivory p-6 dark:bg-ink-soft lg:min-h-screen lg:border-b-0 lg:border-r">
          <Link to="/admin" className="font-display text-xl">SILA <span className="text-stone">Admin</span></Link>
          <p className="mt-1 text-xs text-stone">{user?.name}</p>

          <nav className="mt-8 flex flex-col gap-1">
            {NAV_ITEMS.map((item) =>
              item.ready ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `border-l-2 px-3 py-2 text-sm ${
                      isActive
                        ? 'border-emerald bg-ivory-deep font-medium text-emerald dark:bg-ink'
                        : 'border-transparent text-stone hover:border-stone-light hover:text-ink dark:hover:text-ivory'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <span
                  key={item.to}
                  className="flex items-center justify-between border-l-2 border-transparent px-3 py-2 text-sm text-stone-light"
                  title="Not built yet — needs its own backend endpoints"
                >
                  {item.label}
                  <span className="text-[9px] uppercase tracking-wide">Soon</span>
                </span>
              )
            )}
          </nav>

          <div className="mt-8 flex flex-col gap-1 border-t border-stone-light/40 pt-4">
            <Link to="/" className="px-3 py-2 text-sm text-stone hover:text-ink dark:hover:text-ivory">
              ← Back to Store
            </Link>
            <button onClick={handleLogout} className="px-3 py-2 text-left text-sm text-rani">
              Logout
            </button>
          </div>
        </aside>

        <main className="p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}