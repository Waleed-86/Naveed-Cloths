import { Link } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders.js'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge.jsx'

export default function Orders() {
  const { orders, loading, error } = useOrders()

  if (loading) {
    return (
      <div>
        <h2 className="font-display text-2xl">Order History</h2>
        <div className="mt-6 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse bg-ivory-deep dark:bg-ink-soft" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2 className="font-display text-2xl">Order History</h2>
        <p className="mt-4 text-sm text-rani">Couldn't load your orders right now — please try again shortly.</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="font-display text-2xl">Order History</h2>
        <p className="mt-4 text-sm text-stone">You haven't placed any orders yet.</p>
        <Link to="/" className="thread-underline mt-3 inline-block text-sm text-emerald">Start shopping →</Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display text-2xl">Order History</h2>
      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-stone-light/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{order.order_number}</p>
                <p className="mt-0.5 text-xs text-stone">
                  {new Date(order.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {' · '}
                  {order.items?.length ?? 0} item{order.items?.length !== 1 && 's'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <span className="text-sm font-semibold">Rs. {Number(order.total).toLocaleString()}</span>
              </div>
            </div>
            {order.items?.length > 0 && (
              <p className="mt-3 truncate text-xs text-stone">
                {order.items.map((i) => i.product_name).join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}