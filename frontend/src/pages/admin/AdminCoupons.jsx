import { useState, useEffect } from 'react'
import api from '../../lib/api.js'

const EMPTY = { code: '', type: 'percent', value: '', min_order_amount: '', usage_limit: '', expires_at: '', is_active: true }

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function load() {
    setLoading(true)
    api.get('/admin/coupons').then((res) => setCoupons(res.data.data ?? [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  function startEdit(coupon) {
    setEditingId(coupon.id)
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      min_order_amount: coupon.min_order_amount ?? '',
      usage_limit: coupon.usage_limit ?? '',
      expires_at: coupon.expires_at ? coupon.expires_at.slice(0, 10) : '',
      is_active: coupon.is_active,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(EMPTY)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      value: Number(form.value),
      min_order_amount: form.min_order_amount ? Number(form.min_order_amount) : null,
      usage_limit: form.usage_limit ? Number(form.usage_limit) : null,
      expires_at: form.expires_at || null,
    }

    try {
      if (editingId) {
        await api.put(`/admin/coupons/${editingId}`, payload)
      } else {
        await api.post('/admin/coupons', payload)
      }
      cancelEdit()
      load()
    } catch (err) {
      const messages = err.response?.data?.errors
      setError(messages ? Object.values(messages).flat().join(' ') : 'Failed to save coupon.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(coupon) {
    if (!confirm(`Delete coupon "${coupon.code}"?`)) return
    await api.delete(`/admin/coupons/${coupon.id}`)
    load()
  }

  return (
    <div>
      <h1 className="font-display text-2xl">Coupons</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 bg-ivory p-5 dark:bg-ink-soft sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">Code</label>
          <input
            required
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
            placeholder="SILA10"
            className="w-full border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className="w-full border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          >
            <option value="percent">Percent (%)</option>
            <option value="fixed">Fixed (Rs.)</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">
            Value {form.type === 'percent' ? '(%)' : '(Rs.)'}
          </label>
          <input
            type="number"
            required
            min="0"
            value={form.value}
            onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
            className="w-full border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">Min Order (Rs.)</label>
          <input
            type="number"
            min="0"
            value={form.min_order_amount}
            onChange={(e) => setForm((f) => ({ ...f, min_order_amount: e.target.value }))}
            placeholder="Optional"
            className="w-full border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">Usage Limit</label>
          <input
            type="number"
            min="1"
            value={form.usage_limit}
            onChange={(e) => setForm((f) => ({ ...f, usage_limit: e.target.value }))}
            placeholder="Unlimited"
            className="w-full border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">Expires</label>
          <input
            type="date"
            value={form.expires_at}
            onChange={(e) => setForm((f) => ({ ...f, expires_at: e.target.value }))}
            className="w-full border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          />
        </div>
        <label className="flex items-center gap-2 self-end pb-2.5 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} className="accent-emerald" />
          Active
        </label>
        <div className="flex items-end gap-3">
          <button type="submit" disabled={saving} className="bg-emerald px-5 py-2.5 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60">
            {saving ? 'Saving…' : editingId ? 'Update' : 'Add Coupon'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="px-2 py-2.5 text-sm text-stone hover:text-ink dark:hover:text-ivory">
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-sm text-rani sm:col-span-2 lg:col-span-4">{error}</p>}
      </form>

      <div className="mt-6 overflow-x-auto bg-ivory dark:bg-ink-soft">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-light/40 text-xs uppercase tracking-wide text-stone">
              <th className="p-4">Code</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Min Order</th>
              <th className="p-4">Usage</th>
              <th className="p-4">Expires</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-light/40">
            {loading ? (
              <tr><td colSpan={7} className="p-6 text-center text-stone">Loading…</td></tr>
            ) : coupons.length === 0 ? (
              <tr><td colSpan={7} className="p-6 text-center text-stone">No coupons yet.</td></tr>
            ) : (
              coupons.map((c) => (
                <tr key={c.id}>
                  <td className="p-4 font-medium">{c.code}</td>
                  <td className="p-4">{c.type === 'percent' ? `${Number(c.value)}%` : `Rs. ${Number(c.value).toLocaleString()}`}</td>
                  <td className="p-4 text-stone">{c.min_order_amount ? `Rs. ${Number(c.min_order_amount).toLocaleString()}` : '—'}</td>
                  <td className="p-4 text-stone">{c.times_used}{c.usage_limit ? ` / ${c.usage_limit}` : ''}</td>
                  <td className="p-4 text-stone">{c.expires_at ? new Date(c.expires_at).toLocaleDateString('en-PK') : 'Never'}</td>
                  <td className="p-4">
                    <span className={`text-xs uppercase ${c.is_active ? 'text-emerald' : 'text-stone-light'}`}>
                      {c.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => startEdit(c)} className="thread-underline mr-4 text-xs text-emerald">Edit</button>
                    <button onClick={() => handleDelete(c)} className="text-xs text-rani hover:underline">Delete</button>
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