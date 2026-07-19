import ProductGrid from '../components/product/ProductGrid.jsx'
import { useProducts } from '../hooks/useProducts.js'

const TIERS = ['Premium Quality', 'Medium Quality', 'Budget Friendly']

export default function Men() {
  const { products, loading, error } = useProducts({ category: 'men', per_page: 100 })

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
        {error && (
          <p className="mb-6 text-sm text-rani">
            Couldn't load products right now — is the backend running at the configured API URL?
          </p>
        )}
      </div>

      {TIERS.map((tier) => {
        const tierProducts = products.filter((p) => p.quality === tier)
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