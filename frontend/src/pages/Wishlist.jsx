import { Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid.jsx'
import { useWishlistStore } from '../store/useWishlistStore.js'

export default function Wishlist() {
  const items = useWishlistStore((s) => s.items)

  if (items.length === 0) {
    return (
      <div className="container-premium flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-2xl">Your wishlist is empty</h1>
        <p className="text-sm text-stone">Tap the heart on any product to save it here.</p>
        <Link to="/" className="bg-emerald px-8 py-3 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container-premium py-12">
      <h1 className="font-display text-display-md">Your Wishlist</h1>
      <p className="mt-2 text-sm text-stone">{items.length} item{items.length !== 1 && 's'} saved</p>
      <div className="thread-divider my-6 max-w-[100px]" />
      <ProductGrid products={items} />
    </div>
  )
}