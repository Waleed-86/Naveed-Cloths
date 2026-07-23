import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../lib/api.js'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge.jsx'

export default function AdminCustomerDetail() {
  const { id } = useParams()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get(`/admin/customers/${id}`)
      .then((res) => setCustomer(res.data.data))
      .catch(() => setError('Could not load this customer.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="text-sm text-stone">Loading…</p>
  if (error) return <p className="text-sm text-rani">{error}</p>

  return (
    <div>
      <Link to="/admin/customers" className="thread-underline text-xs text-stone">← Back to Customers</Link>

      <h1 className="mt-3 font-display text-2xl">{customer.name}</h1>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone">
        <span>{customer.email}</span>
        <span>{customer.phone || 'No phone on file'}</span>
        <span>Joined {new Date(customer.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>

      <h2 className="mt-8 font-display text-xl">Order History</h2>
      <div className="mt-4 divide-y divide-stone-light/40 bg-ivory dark:bg-ink-soft">
        {customer.orders?.length === 0 ? (
          <p className="p-5 text-sm text-stone">This customer hasn't placed any orders yet.</p>
        ) : (
          customer.orders?.map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
              <div>
                <p className="font-medium">{order.order_number}</p>
                <p className="text-xs text-stone">
                  {new Date(order.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {' · '}{order.items?.length ?? 0} item{order.items?.length !== 1 && 's'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <span className="font-medium">Rs. {Number(order.total).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}