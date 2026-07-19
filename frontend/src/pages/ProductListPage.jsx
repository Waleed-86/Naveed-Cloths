import ProductGrid from '../components/product/ProductGrid.jsx'
import { useProducts } from '../hooks/useProducts.js'

export default function ProductListPage({ title, subtitle, apiParams }) {
  const { products, loading, error } = useProducts({ per_page: 24, ...apiParams })

  return (
    <div className="container-premium py-12">
      <p className="eyebrow">Collection</p>
      <h1 className="mt-2 font-display text-display-md">{title}</h1>
      {subtitle && <p className="mt-3 max-w-lg text-sm text-stone">{subtitle}</p>}
      <div className="thread-divider my-8 max-w-[140px]" />

      {error && (
        <p className="mb-6 text-sm text-rani">
          Couldn't load products right now — is the backend running at the configured API URL?
        </p>
      )}

      <ProductGrid products={products} loading={loading} skeletonCount={8} />
    </div>
  )
}