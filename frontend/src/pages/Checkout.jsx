import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore, selectCartSubtotal } from '../store/useCartStore.js'
import FormInput, { FormField } from '../components/ui/FormInput.jsx'
import api from '../lib/api.js'

const PROVINCES = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir', 'Islamabad Capital Territory']

// Gateway list only — actual integration is a backend service-layer concern
// (see spec: each gateway implemented behind an abstraction so new ones can
// be added without touching business logic). Frontend just captures the choice.
const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery' },
  { id: 'jazzcash', label: 'JazzCash' },
  { id: 'easypaisa', label: 'Easypaisa' },
  { id: 'bank_transfer', label: 'Bank Transfer' },
  { id: 'payfast', label: 'PayFast' },
  { id: 'stripe', label: 'Card (Stripe)' },
]

const FREE_SHIPPING_THRESHOLD = 5000
const FLAT_SHIPPING = 200

export default function Checkout() {
  const navigate = useNavigate()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore(selectCartSubtotal)
  const clearCart = useCartStore((s) => s.clearCart)

  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', province: '', city: '',
    address: '', postalCode: '', notes: '', payment: 'cod',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
  const total = subtotal + shipping

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Required'
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!form.province) next.province = 'Required'
    if (!form.city.trim()) next.city = 'Required'
    if (!form.address.trim()) next.address = 'Required'
    if (!form.postalCode.trim()) next.postalCode = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    if (!validate() || items.length === 0) return

    setSubmitting(true)
    try {
      const response = await api.post('/orders', {
        full_name: form.fullName,
        phone: form.phone,
        email: form.email,
        province: form.province,
        city: form.city,
        address: form.address,
        postal_code: form.postalCode,
        notes: form.notes || null,
        payment_method: form.payment,
        items: items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
      })

      const order = response.data.data
      clearCart()
      navigate(`/order-confirmation/${order.order_number}`, {
        state: { orderNumber: order.order_number, total: Number(order.total), form },
      })
    } catch (err) {
      if (err.response?.status === 422) {
        const messages = err.response.data.errors
        setSubmitError(Object.values(messages).flat().join(' '))
      } else {
        setSubmitError('Something went wrong placing your order. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-premium flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-2xl">Nothing to check out</h1>
        <Link to="/" className="bg-emerald px-8 py-3 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container-premium py-12">
      <h1 className="font-display text-display-md">Checkout</h1>
      <div className="thread-divider my-6 max-w-[100px]" />

      <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-3">
        {/* Customer details */}
        <div className="space-y-5 lg:col-span-2">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Full Name" required error={errors.fullName}>
              <FormInput value={form.fullName} onChange={(e) => update('fullName', e.target.value)} error={errors.fullName} />
            </FormField>
            <FormField label="Phone Number" required error={errors.phone}>
              <FormInput value={form.phone} onChange={(e) => update('phone', e.target.value)} error={errors.phone} placeholder="03XXXXXXXXX" />
            </FormField>
          </div>

          <FormField label="Email" required error={errors.email}>
            <FormInput type="email" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Province" required error={errors.province}>
              <select
                value={form.province}
                onChange={(e) => update('province', e.target.value)}
                className={`w-full border bg-transparent px-3.5 py-2.5 text-sm focus:outline-none ${errors.province ? 'border-rani' : 'border-stone-light/60 focus:border-emerald'}`}
              >
                <option value="">Select province</option>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </FormField>
            <FormField label="City" required error={errors.city}>
              <FormInput value={form.city} onChange={(e) => update('city', e.target.value)} error={errors.city} />
            </FormField>
          </div>

          <FormField label="Complete Address" required error={errors.address}>
            <textarea
              rows={3}
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              className={`w-full border bg-transparent px-3.5 py-2.5 text-sm focus:outline-none ${errors.address ? 'border-rani' : 'border-stone-light/60 focus:border-emerald'}`}
            />
          </FormField>

          <FormField label="Postal Code" required error={errors.postalCode}>
            <FormInput value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} error={errors.postalCode} className="max-w-xs" />
          </FormField>

          <FormField label="Additional Notes">
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Delivery instructions, gift note, etc."
              className="w-full border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
            />
          </FormField>

          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-stone">Payment Method</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-center gap-2.5 border px-3.5 py-2.5 text-sm ${
                    form.payment === method.id ? 'border-emerald bg-ivory-deep dark:bg-ink-soft' : 'border-stone-light/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={form.payment === method.id}
                    onChange={() => update('payment', method.id)}
                    className="accent-emerald"
                  />
                  {method.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="h-fit bg-ivory-deep p-6 dark:bg-ink-soft">
          <h2 className="font-display text-xl">Order Summary</h2>
          <div className="mt-5 space-y-3 divide-y divide-stone-light/40 text-sm">
            {items.map((item) => (
              <div key={item.key} className="flex justify-between gap-3 pt-3 first:pt-0">
                <span className="text-stone">{item.name} × {item.quantity}</span>
                <span className="shrink-0 font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-stone-light/40 pt-5 text-sm">
            <div className="flex justify-between text-stone">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between border-t border-stone-light/40 pt-3 text-base font-semibold">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
          {submitError && <p className="mt-4 text-sm text-rani">{submitError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-emerald py-3.5 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60"
          >
            {submitting ? 'Placing Order…' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  )
}