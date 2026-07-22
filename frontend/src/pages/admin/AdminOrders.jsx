import { useState, useEffect } from 'react'
import api from '../../lib/api.js'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge.jsx'

const STATUSES = ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled', 'returned']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    setLoading(true)
    api
      .get('/admin/orders', { params: statusFilter ? { status: statusFilter } : {} })
      .then((res) => setOrders(res.data.data ?? []))
      .finally(() => setLoading(false))
  }, [statusFilter])

  async function handleStatusChange(orderId, newStatus) {
    setUpdatingId(orderId)
    try {
      await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus })
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    } catch {
      // TODO: surface a toast on failure once a toast system is wired up
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto bg-ivory dark:bg-ink-soft">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-light/40 text-xs uppercase tracking-wide text-stone">
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-light/40">
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-stone">Loading…</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-stone">No orders found.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-4">
                    <p className="font-medium">{order.order_number}</p>
                    <p className="text-xs text-stone">{new Date(order.created_at).toLocaleDateString('en-PK')}</p>
                  </td>
                  <td className="p-4">
                    <p>{order.full_name}</p>
                    <p className="text-xs text-stone">{order.email}</p>
                  </td>
                  <td className="p-4 font-medium">Rs. {Number(order.total).toLocaleString()}</td>
                  <td className="p-4">
                    <span className="text-xs uppercase text-stone">{order.payment_status}</span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border border-stone-light/60 bg-transparent px-2 py-1.5 text-xs focus:border-emerald focus:outline-none disabled:opacity-50"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className="ml-2 inline-block align-middle"><OrderStatusBadge status={order.status} /></span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}