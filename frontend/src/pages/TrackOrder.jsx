import { useState } from 'react'
import api from '../lib/api.js'
import { useAuthStore, selectIsAuthenticated } from '../store/useAuthStore.js'
import FormInput, { FormField } from '../components/ui/FormInput.jsx'
import OrderTimeline from '../components/ui/OrderTimeline.jsx'
import OrderStatusBadge from '../components/ui/OrderStatusBadge.jsx'

export default function TrackOrder() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setOrder(null)
    setLoading(true)

    try {
      const params = isAuthenticated ? {} : { email }
      const res = await api.get(`/orders/${encodeURIComponent(orderNumber.trim())}`, { params })
      setOrder(res.data.data)
    } catch (err) {
      if (err.response?.status === 404) {
        setError("We couldn't find an order matching those details.")
      } else if (err.response?.status === 422) {
        setError('Please enter the email address used when placing the order.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-premium py-12">
      <p className="eyebrow">Order Status</p>
      <h1 className="mt-2 font-display text-display-md">Track Your Order</h1>
      <div className="thread-divider my-6 max-w-[100px]" />

      <form onSubmit={handleSubmit} className="grid max-w-lg gap-5">
        <FormField label="Order Number" required>
          <FormInput
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="SILA-260722-A1B2C"
          />
        </FormField>
        {!isAuthenticated && (
          <FormField label="Email used at checkout" required>
            <FormInput type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormField>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60"
        >
          {loading ? 'Searching…' : 'Track Order'}
        </button>
        {error && <p className="text-sm text-rani">{error}</p>}
      </form>

      {order && (
        <div className="mt-12 max-w-2xl border border-stone-light/40 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-xl">{order.order_number}</p>
              <p className="mt-0.5 text-xs text-stone">
                Placed {new Date(order.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="mt-8">
            <OrderTimeline status={order.status} />
          </div>

          <div className="mt-8 space-y-2 border-t border-stone-light/40 pt-6 text-sm">
            {order.items?.map((item) => (
              <div key={item.id} className="flex justify-between text-stone">
                <span>{item.product_name} × {item.quantity}</span>
                <span>Rs. {Number(item.line_total).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-stone-light/40 pt-3 font-semibold text-ink dark:text-ivory">
              <span>Total</span>
              <span>Rs. {Number(order.total).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}