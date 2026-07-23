import { useState, useEffect } from 'react'
import api from '../../lib/api.js'

const EMPTY = { name: '', type: 'general', sort_order: 0, is_active: true }

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function load() {
    setLoading(true)
    api.get('/admin/categories').then((res) => setCategories(res.data.data ?? [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  function startEdit(category) {
    setEditingId(category.id)
    setForm({ name: category.name, type: category.type, sort_order: category.sort_order, is_active: category.is_active })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(EMPTY)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editingId) {
        await api.put(`/admin/categories/${editingId}`, form)
      } else {
        await api.post('/admin/categories', form)
      }
      cancelEdit()
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(category) {
    if (!confirm(`Delete "${category.name}"?`)) return
    try {
      await api.delete(`/admin/categories/${category.id}`)
      load()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete category.')
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl">Categories</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap items-end gap-3 bg-ivory p-5 dark:bg-ink-soft">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className="border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="general">General</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">Sort Order</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
            className="w-20 border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          />
        </div>
        <label className="flex items-center gap-2 pb-2.5 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} className="accent-emerald" />
          Active
        </label>
        <button type="submit" disabled={saving} className="bg-emerald px-5 py-2 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60">
          {saving ? 'Saving…' : editingId ? 'Update' : 'Add Category'}
        </button>
        {editingId && (
          <button type="button" onClick={cancelEdit} className="px-4 py-2 text-sm text-stone hover:text-ink dark:hover:text-ivory">
            Cancel
          </button>
        )}
        {error && <p className="w-full text-sm text-rani">{error}</p>}
      </form>

      <div className="mt-6 divide-y divide-stone-light/40 bg-ivory dark:bg-ink-soft">
        {loading ? (
          <p className="p-5 text-sm text-stone">Loading…</p>
        ) : categories.length === 0 ? (
          <p className="p-5 text-sm text-stone">No categories yet.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between gap-4 p-4 text-sm">
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-xs text-stone">
                  {cat.type} · slug: {cat.slug} {!cat.is_active && '· inactive'}
                </p>
              </div>
              <div className="flex shrink-0 gap-4">
                <button onClick={() => startEdit(cat)} className="thread-underline text-xs text-emerald">Edit</button>
                <button onClick={() => handleDelete(cat)} className="text-xs text-rani hover:underline">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}