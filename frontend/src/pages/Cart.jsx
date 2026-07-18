import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useCartStore, selectCartSubtotal } from '../store/useCartStore.js'
import QuantitySelector from '../components/ui/QuantitySelector.jsx'

const FREE_SHIPPING_THRESHOLD = 5000
const FLAT_SHIPPING = 200

export default function Cart() {
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore(selectCartSubtotal)

  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  // TODO: replace with real coupon validation against the backend
  function applyCoupon(e) {
    e.preventDefault()
    if (coupon.trim().toUpperCase() === 'SILA10') {
      setAppliedCoupon({ code: 'SILA10', percent: 10 })
      setCouponError('')
    } else {
      setAppliedCoupon(null)
      setCouponError('Invalid or expired coupon code')
    }
  }

  const discount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.percent / 100)) : 0
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
  const tax = 0 // No sales tax applied at retail level currently — adjust here if that changes
  const total = subtotal - discount + shipping + tax

  if (items.length === 0) {
    return (
      <div className="container-premium flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-2xl">Your cart is empty</h1>
        <p className="text-sm text-stone">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-emerald px-8 py-3 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container-premium py-12">
      <h1 className="font-display text-display-md">Your Cart</h1>
      <div className="thread-divider my-6 max-w-[100px]" />

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Line items */}
        <div className="divide-y divide-stone-light/40 lg:col-span-2">
          {items.map((item) => (
            <div key={item.key} className="flex gap-4 py-6">
              <Link to={`/product/${item.slug}`} className={`h-28 w-24 shrink-0 bg-gradient-to-br ${item.tone}`} />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to={`/product/${item.slug}`} className="font-display text-lg hover:text-emerald">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-stone">
                      {item.size && `Size: ${item.size}`} {item.color && `· Colour selected`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    aria-label="Remove item"
                    className="text-stone hover:text-rani"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(q) => updateQuantity(item.key, q)}
                    max={item.stock}
                  />
                  <span className="font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit bg-ivory-deep p-6 dark:bg-ink-soft">
          <h2 className="font-display text-xl">Order Summary</h2>

          <form onSubmit={applyCoupon} className="mt-5 flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="w-full border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 border border-ink px-4 py-2 text-xs font-medium uppercase tracking-wide hover:bg-ink hover:text-ivory dark:border-ivory dark:hover:bg-ivory dark:hover:text-ink"
            >
              Apply
            </button>
          </form>
          {couponError && <p className="mt-1.5 text-xs text-rani">{couponError}</p>}
          {appliedCoupon && (
            <p className="mt-1.5 text-xs text-emerald">
              "{appliedCoupon.code}" applied — {appliedCoupon.percent}% off
            </p>
          )}

          <div className="mt-6 space-y-3 border-t border-stone-light/40 pt-6 text-sm">
            <div className="flex justify-between text-stone">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald">
                <span>Discount</span>
                <span>-Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-stone">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between text-stone">
              <span>Tax</span>
              <span>Rs. {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-stone-light/40 pt-3 text-base font-semibold">
              <span>Estimated Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          {subtotal < FREE_SHIPPING_THRESHOLD && (
            <p className="mt-3 text-xs text-stone">
              Add Rs. {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} more for free shipping.
            </p>
          )}

          <Link
            to="/checkout"
            className="mt-6 block w-full bg-emerald py-3.5 text-center text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}