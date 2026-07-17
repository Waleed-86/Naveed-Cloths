import { useState, useEffect } from 'react'
import ProductGrid from '../components/product/ProductGrid.jsx'
import { MOCK_PRODUCTS } from '../data/mockProducts.js'

const TIERS = ['Premium Quality', 'Medium Quality', 'Budget Friendly']

export default function Men() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated fetch delay — replace with real GET /api/products?category=men
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const menProducts = MOCK_PRODUCTS.filter((p) => p.category === 'men')

  return (
    <div>
      <div className="container-premium pt-12">
        <p className="eyebrow">Collection</p>
        <h1 className="mt-2 font-display text-display-md">Men's Collection</h1>
        <p className="mt-3 max-w-lg text-sm text-stone">
          Tailored essentials across three quality tiers — pick the fabric and
          finish that fits your budget without compromising on cut.
        </p>
        <div className="thread-divider my-8 max-w-[140px]" />
      </div>

      {TIERS.map((tier) => {
        const tierProducts = menProducts.filter((p) => p.quality === tier)
        if (!loading && tierProducts.length === 0) return null

        return (
          <section key={tier} className="container-premium py-10">
            <h2 className="mb-6 font-display text-2xl">{tier}</h2>
            <ProductGrid products={tierProducts} loading={loading} skeletonCount={4} />
          </section>
        )
      })}
    </div>
  )
}