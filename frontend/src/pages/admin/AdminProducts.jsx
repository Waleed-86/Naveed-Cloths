import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/api.js'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const fetchProducts = useCallback(() => {
    setLoading(true)
    api
      .get('/admin/products', { params: search ? { search } : {} })
      .then((res) => setProducts(res.data.data ?? []))
      .finally(() => setLoading(false))
  }, [search])

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300)
    return () => clearTimeout(timer)
  }, [fetchProducts])

  async function toggleActive(product) {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, is_active: !p.is_active } : p)))
    try {
      await api.put(`/admin/products/${product.id}`, {
        category_id: product.category_id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        stock: product.stock,
        is_active: !product.is_active,
      })
    } catch {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))
    }
  }

  async function handleDelete(product) {
    if (!confirm(`Delete "${product.name}"? This can't be undone from here.`)) return
    setDeletingId(product.id)
    try {
      await api.delete(`/admin/products/${product.id}`)
      setProducts((prev) => prev.filter((p) => p.id !== product.id))
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl">Products</h1>
        <div className="flex gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
          />
          <Link
            to="/admin/products/new"
            className="bg-emerald px-4 py-2 text-xs font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light"
          >
            + Add Product
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-ivory dark:bg-ink-soft">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-light/40 text-xs uppercase tracking-wide text-stone">
              <th className="p-4">Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Active</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-light/40">
            {loading ? (
              <tr><td colSpan={7} className="p-6 text-center text-stone">Loading…</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={7} className="p-6 text-center text-stone">No products found.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="p-4">
                    <Link to={`/admin/products/${product.id}/edit`} className="font-medium hover:text-emerald">
                      {product.name}
                    </Link>
                  </td>
                  <td className="p-4 text-stone">{product.sku}</td>
                  <td className="p-4 text-stone">{product.category?.name ?? '—'}</td>
                  <td className="p-4">
                    Rs. {Number(product.discount_price ?? product.price).toLocaleString()}
                    {product.discount_price && (
                      <span className="ml-1.5 text-xs text-stone line-through">
                        Rs. {Number(product.price).toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={product.stock <= product.low_stock_threshold ? 'text-rani' : ''}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(product)}
                      className={`h-5 w-9 rounded-full transition-colors ${product.is_active ? 'bg-emerald' : 'bg-stone-light'}`}
                      aria-label={product.is_active ? 'Deactivate product' : 'Activate product'}
                    >
                      <span
                        className={`block h-4 w-4 rounded-full bg-ivory transition-transform ${product.is_active ? 'translate-x-4' : 'translate-x-0.5'}`}
                      />
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <Link to={`/admin/products/${product.id}/edit`} className="text-xs text-stone hover:text-emerald">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product.id}
                      className="ml-3 text-xs text-stone hover:text-rani disabled:opacity-50"
                    >
                      Delete
                    </button>
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