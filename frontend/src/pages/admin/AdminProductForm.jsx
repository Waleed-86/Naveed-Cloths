import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../lib/api.js'
import { useCategories } from '../../hooks/useCategories.js'
import FormInput, { FormField } from '../../components/ui/FormInput.jsx'

const EMPTY_FORM = {
  category_id: '', name: '', sku: '', description: '', fabric: '', care_instructions: '',
  quality: '', pieces: '', stitching: '', work_type: '',
  price: '', discount_price: '', stock: '', low_stock_threshold: '10',
  sizes: '', colors: '',
  is_new: false, is_best_seller: false, is_active: true,
}

export default function AdminProductForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const { categories } = useCategories()

  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditing) return

    api
      .get(`/admin/products/${id}`)
      .then((res) => {
        const p = res.data.data
        setForm({
          category_id: p.category_id ?? '',
          name: p.name ?? '',
          sku: p.sku ?? '',
          description: p.description ?? '',
          fabric: p.fabric ?? '',
          care_instructions: p.care_instructions ?? '',
          quality: p.quality ?? '',
          pieces: p.pieces ?? '',
          stitching: p.stitching ?? '',
          work_type: p.work_type ?? '',
          price: p.price ?? '',
          discount_price: p.discount_price ?? '',
          stock: p.stock ?? '',
          low_stock_threshold: p.low_stock_threshold ?? '10',
          sizes: (p.sizes ?? []).join(', '),
          colors: (p.colors ?? []).join(', '),
          is_new: Boolean(p.is_new),
          is_best_seller: Boolean(p.is_best_seller),
          is_active: Boolean(p.is_active),
        })
      })
      .catch(() => setError('Could not load this product.'))
      .finally(() => setLoading(false))
  }, [id, isEditing])

  const selectedCategory = categories.find((c) => c.id === Number(form.category_id))
  const categoryType = selectedCategory?.type

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      category_id: Number(form.category_id),
      price: Number(form.price),
      discount_price: form.discount_price ? Number(form.discount_price) : null,
      stock: Number(form.stock),
      low_stock_threshold: Number(form.low_stock_threshold || 10),
      sizes: form.sizes ? form.sizes.split(',').map((s) => s.trim()).filter(Boolean) : [],
      colors: form.colors ? form.colors.split(',').map((c) => c.trim()).filter(Boolean) : [],
      quality: categoryType === 'men' ? form.quality || null : null,
      pieces: categoryType === 'women' ? form.pieces || null : null,
      stitching: categoryType === 'women' ? form.stitching || null : null,
      work_type: categoryType === 'women' ? form.work_type || null : null,
    }

    try {
      if (isEditing) {
        await api.put(`/admin/products/${id}`, payload)
      } else {
        await api.post('/admin/products', payload)
      }
      navigate('/admin/products')
    } catch (err) {
      const messages = err.response?.data?.errors
      setError(messages ? Object.values(messages).flat().join(' ') : 'Failed to save product.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-stone">Loading…</p>

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl">{isEditing ? 'Edit Product' : 'Add Product'}</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Name" required>
            <FormInput required value={form.name} onChange={(e) => update('name', e.target.value)} />
          </FormField>
          <FormField label="SKU" required>
            <FormInput required value={form.sku} onChange={(e) => update('sku', e.target.value)} />
          </FormField>
        </div>

        <FormField label="Category" required>
          <select
            required
            value={form.category_id}
            onChange={(e) => update('category_id', e.target.value)}
            className="w-full border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
          >
            <option value="">Select category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </FormField>

        {categoryType === 'men' && (
          <FormField label="Quality Tier">
            <select
              value={form.quality}
              onChange={(e) => update('quality', e.target.value)}
              className="w-full border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
            >
              <option value="">Select tier</option>
              <option value="premium">Premium Quality</option>
              <option value="medium">Medium Quality</option>
              <option value="budget">Budget Friendly</option>
            </select>
          </FormField>
        )}

        {categoryType === 'women' && (
          <div className="grid gap-5 sm:grid-cols-3">
            <FormField label="Pieces">
              <select value={form.pieces} onChange={(e) => update('pieces', e.target.value)} className="w-full border border-stone-light/60 bg-transparent px-3 py-2.5 text-sm focus:border-emerald focus:outline-none">
                <option value="">—</option>
                <option value="2_piece">2 Piece</option>
                <option value="3_piece">3 Piece</option>
              </select>
            </FormField>
            <FormField label="Stitching">
              <select value={form.stitching} onChange={(e) => update('stitching', e.target.value)} className="w-full border border-stone-light/60 bg-transparent px-3 py-2.5 text-sm focus:border-emerald focus:outline-none">
                <option value="">—</option>
                <option value="stitched">Stitched</option>
                <option value="unstitched">Unstitched</option>
              </select>
            </FormField>
            <FormField label="Work">
              <select value={form.work_type} onChange={(e) => update('work_type', e.target.value)} className="w-full border border-stone-light/60 bg-transparent px-3 py-2.5 text-sm focus:border-emerald focus:outline-none">
                <option value="">—</option>
                <option value="simple_printed">Simple Printed</option>
                <option value="embroidered">Embroidered / Fancy Work</option>
              </select>
            </FormField>
          </div>
        )}

        <FormField label="Fabric">
          <FormInput value={form.fabric} onChange={(e) => update('fabric', e.target.value)} />
        </FormField>

        <FormField label="Description">
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className="w-full border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-3">
          <FormField label="Price (Rs.)" required>
            <FormInput type="number" min="0" step="1" required value={form.price} onChange={(e) => update('price', e.target.value)} />
          </FormField>
          <FormField label="Discount Price (Rs.)">
            <FormInput type="number" min="0" step="1" value={form.discount_price} onChange={(e) => update('discount_price', e.target.value)} />
          </FormField>
          <FormField label="Stock" required>
            <FormInput type="number" min="0" step="1" required value={form.stock} onChange={(e) => update('stock', e.target.value)} />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Sizes (comma-separated)">
            <FormInput value={form.sizes} onChange={(e) => update('sizes', e.target.value)} placeholder="S, M, L, XL" />
          </FormField>
          <FormField label="Colors (comma-separated hex)">
            <FormInput value={form.colors} onChange={(e) => update('colors', e.target.value)} placeholder="#0F3D2E, #1C1A1E" />
          </FormField>
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_new} onChange={(e) => update('is_new', e.target.checked)} className="accent-emerald" />
            Mark as New
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_best_seller} onChange={(e) => update('is_best_seller', e.target.checked)} className="accent-emerald" />
            Best Seller
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_active} onChange={(e) => update('is_active', e.target.checked)} className="accent-emerald" />
            Active (visible on storefront)
          </label>
        </div>

        {error && <p className="text-sm text-rani">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-emerald px-8 py-3 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60"
        >
          {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}