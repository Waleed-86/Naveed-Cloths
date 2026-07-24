import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import api from '../../lib/api.js'

export default function AdminReports() {
  const [sales, setSales] = useState(null)
  const [inventory, setInventory] = useState(null)
  const [days, setDays] = useState(30)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.get('/admin/reports/sales', { params: { days } }),
      api.get('/admin/reports/inventory'),
    ])
      .then(([salesRes, invRes]) => {
        setSales(salesRes.data.data)
        setInventory(invRes.data.data)
      })
      .finally(() => setLoading(false))
  }, [days])

  if (loading || !sales || !inventory) {
    return <p className="text-sm text-stone">Loading reports…</p>
  }

  const chartData = sales.revenue_by_day.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }),
    revenue: Number(d.revenue),
  }))

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl">Reports</h1>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border border-stone-light/60 bg-transparent px-3 py-2 text-sm focus:border-emerald focus:outline-none"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="bg-ivory p-5 dark:bg-ink-soft">
          <p className="text-xs uppercase tracking-wide text-stone">Revenue ({days}d)</p>
          <p className="mt-2 font-display text-2xl">Rs. {sales.total_revenue.toLocaleString()}</p>
        </div>
        <div className="bg-ivory p-5 dark:bg-ink-soft">
          <p className="text-xs uppercase tracking-wide text-stone">Paid Orders ({days}d)</p>
          <p className="mt-2 font-display text-2xl">{sales.total_orders}</p>
        </div>
        <div className="bg-ivory p-5 dark:bg-ink-soft">
          <p className="text-xs uppercase tracking-wide text-stone">Active Products</p>
          <p className="mt-2 font-display text-2xl">{inventory.total_active_products}</p>
        </div>
        <div className="bg-ivory p-5 dark:bg-ink-soft">
          <p className="text-xs uppercase tracking-wide text-stone">Stock Units</p>
          <p className="mt-2 font-display text-2xl">{inventory.total_stock_units}</p>
        </div>
      </div>

      <div className="mt-8 bg-ivory p-6 dark:bg-ink-soft">
        <h2 className="font-display text-lg">Revenue Trend</h2>
        {chartData.length === 0 ? (
          <p className="mt-4 text-sm text-stone">No paid orders in this period yet.</p>
        ) : (
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => [`Rs. ${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#0F3D2E" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="bg-ivory p-6 dark:bg-ink-soft">
          <h2 className="font-display text-lg">Top Products ({days}d)</h2>
          <div className="mt-4 divide-y divide-stone-light/40">
            {sales.top_products.length === 0 ? (
              <p className="py-3 text-sm text-stone">No sales data yet.</p>
            ) : (
              sales.top_products.map((p) => (
                <div key={p.product_name} className="flex items-center justify-between py-2.5 text-sm">
                  <span>{p.product_name}</span>
                  <span className="text-stone">{p.units_sold} sold</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-ivory p-6 dark:bg-ink-soft">
          <h2 className="font-display text-lg">Inventory Alerts</h2>
          <div className="mt-4 space-y-1 divide-y divide-stone-light/40">
            {inventory.out_of_stock.map((p) => (
              <div key={`out-${p.id}`} className="flex items-center justify-between py-2.5 text-sm">
                <Link to={`/admin/products/${p.id}/edit`} className="hover:text-emerald">{p.name}</Link>
                <span className="text-xs uppercase text-rani">Out of stock</span>
              </div>
            ))}
            {inventory.low_stock.map((p) => (
              <div key={`low-${p.id}`} className="flex items-center justify-between py-2.5 text-sm">
                <Link to={`/admin/products/${p.id}/edit`} className="hover:text-emerald">{p.name}</Link>
                <span className="text-xs uppercase text-gold-dark">{p.stock} left</span>
              </div>
            ))}
            {inventory.out_of_stock.length === 0 && inventory.low_stock.length === 0 && (
              <p className="py-3 text-sm text-stone">All products are well-stocked.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}