import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore.js'

const NAV_ITEMS = [
  { label: 'Profile', to: '/account', end: true },
  { label: 'Order History', to: '/account/orders' },
  { label: 'Address Book', to: '/account/addresses' },
  { label: 'Change Password', to: '/account/change-password' },
]

export default function AccountLayout() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <div className="container-premium grid gap-10 py-12 lg:grid-cols-[220px_1fr]">
      <aside>
        <p className="eyebrow">My Account</p>
        <p className="mt-2 font-display text-xl">{user?.name}</p>
        <nav className="mt-6 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `border-l-2 px-3 py-2 text-sm ${
                  isActive
                    ? 'border-emerald bg-ivory-deep font-medium text-emerald dark:bg-ink-soft'
                    : 'border-transparent text-stone hover:border-stone-light hover:text-ink dark:hover:text-ivory'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="mt-2 border-l-2 border-transparent px-3 py-2 text-left text-sm text-rani hover:border-rani"
          >
            Logout
          </button>
        </nav>
      </aside>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

// Lightweight placeholders — real data needs their respective backend
// endpoints (orders table, addresses table, password-change endpoint).
export function OrdersPlaceholder() {
  return (
    <div>
      <h2 className="font-display text-2xl">Order History</h2>
      <p className="mt-4 text-sm text-stone">
        You haven't placed any orders yet. Once the order history API is
        connected, your past orders will appear here with status and tracking.
      </p>
    </div>
  )
}

export function AddressesPlaceholder() {
  return (
    <div>
      <h2 className="font-display text-2xl">Address Book</h2>
      <p className="mt-4 text-sm text-stone">
        No saved addresses yet. This section will let you save multiple
        delivery addresses once the addresses API is built.
      </p>
    </div>
  )
}

export function ChangePasswordPlaceholder() {
  return (
    <div>
      <h2 className="font-display text-2xl">Change Password</h2>
      <p className="mt-4 text-sm text-stone">
        Password change form goes here once the backend endpoint exists.
      </p>
    </div>
  )
}