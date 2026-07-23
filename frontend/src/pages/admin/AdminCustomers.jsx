import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/api.js'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      api
        .get('/admin/customers', { params: search ? { search } : {} })
        .then((res) => setCustomers(res.data.data ?? []))
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div>
      <h1 className="font-display text-2xl">Customers</h1>

      <input
        type="text"
        placeholder="Search by name or email…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 w-full max-w-sm border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
      />

      <div className="mt-6 overflow-x-auto bg-ivory dark:bg-ink-soft">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-light/40 text-xs uppercase tracking-wide text-stone">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-light/40">
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-stone">Loading…</td></tr>
            ) : customers.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-stone">No customers found.</td></tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id}>
                  <td className="p-4">
                    <Link to={`/admin/customers/${c.id}`} className="font-medium hover:text-emerald">{c.name}</Link>
                  </td>
                  <td className="p-4 text-stone">{c.email}</td>
                  <td className="p-4 text-stone">{c.phone || '—'}</td>
                  <td className="p-4">{c.orders_count}</td>
                  <td className="p-4 font-medium">Rs. {Number(c.total_spent ?? 0).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}