import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/api.js'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge.jsx'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/admin/dashboard')
      .then((res) => setStats(res.data.data))
      .catch(() => setError('Could not load dashboard stats.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse bg-ivory dark:bg-ink-soft" />
        ))}
      </div>
    )
  }

  if (error) return <p className="text-sm text-rani">{error}</p>

  const cards = [
    { label: 'Total Orders', value: stats.total_orders },
    { label: 'Pending Orders', value: stats.pending_orders },
    { label: 'Total Revenue', value: `Rs. ${Number(stats.total_revenue).toLocaleString()}` },
    { label: 'Products', value: stats.total_products },
    { label: 'Customers', value: stats.total_customers },
    { label: 'Low Stock', value: stats.low_stock_products },
    { label: 'Out of Stock', value: stats.out_of_stock_products },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl">Dashboard Overview</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-ivory p-5 dark:bg-ink-soft">
            <p className="text-xs uppercase tracking-wide text-stone">{card.label}</p>
            <p className="mt-2 font-display text-2xl">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Recent Orders</h2>
          <Link to="/admin/orders" className="thread-underline text-sm text-emerald">View All →</Link>
        </div>
        <div className="divide-y divide-stone-light/40 bg-ivory dark:bg-ink-soft">
          {stats.recent_orders?.length === 0 && (
            <p className="p-5 text-sm text-stone">No orders yet.</p>
          )}
          {stats.recent_orders?.map((order) => (
            <div key={order.id} className="flex items-center justify-between gap-3 p-4 text-sm">
              <div>
                <p className="font-medium">{order.order_number}</p>
                <p className="text-xs text-stone">{order.full_name}</p>
              </div>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <span className="font-medium">Rs. {Number(order.total).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}