import { useParams, useLocation, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

export default function OrderConfirmation() {
  const { orderNumber } = useParams()
  const { state } = useLocation() // populated when arriving right after checkout

  return (
    <div className="container-premium flex min-h-[70vh] flex-col items-center py-16 text-center">
      <CheckCircle2 size={56} strokeWidth={1.25} className="text-emerald" />
      <h1 className="mt-6 font-display text-display-md">Thank you for your order</h1>
      <p className="mt-3 text-sm text-stone">
        A confirmation has been sent to {state?.form?.email || 'your email'}.
      </p>

      <div className="mt-8 w-full max-w-md border border-stone-light/40 p-6 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-stone">Order Number</span>
          <span className="font-semibold">{orderNumber}</span>
        </div>
        {state?.total !== undefined && (
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-stone">Total Paid</span>
            <span className="font-semibold">Rs. {state.total.toLocaleString()}</span>
          </div>
        )}
        {state?.form?.payment && (
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-stone">Payment Method</span>
            <span className="font-semibold uppercase">{state.form.payment.replace('_', ' ')}</span>
          </div>
        )}
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-stone">Estimated Delivery</span>
          <span className="font-semibold">3-5 business days</span>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/track-order" className="bg-emerald px-8 py-3 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light">
          Track Order
        </Link>
        <Link to="/" className="border border-ink px-8 py-3 text-sm font-medium uppercase tracking-wide hover:bg-ink hover:text-ivory dark:border-ivory dark:hover:bg-ivory dark:hover:text-ink">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}