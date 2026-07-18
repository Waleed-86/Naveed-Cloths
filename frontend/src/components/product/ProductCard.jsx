import { Link } from 'react-router-dom'
import { Heart, Eye } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore.js'
import { useWishlistStore, selectIsWishlisted } from '../../store/useWishlistStore.js'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const toggleWishlistItem = useWishlistStore((s) => s.toggleItem)
  const wishlisted = useWishlistStore(selectIsWishlisted(product.id))
  const hasDiscount = Boolean(product.discountPrice)
  const percentOff = hasDiscount
    ? Math.round(100 - (product.discountPrice / product.price) * 100)
    : 0

  function toggleWishlist(e) {
    e.preventDefault()
    toggleWishlistItem(product)
  }

  function quickView(e) {
    e.preventDefault()
    // TODO: open Quick View modal once built
  }

  function addToCart(e) {
    e.preventDefault()
    addItem(product, {
      size: product.sizes?.[0] ?? null,
      color: product.colors?.[0] ?? null,
      quantity: 1,
    })
  }

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      {/* Image area — placeholder color block until real product photography exists */}
      <div className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${product.tone}`}>
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-ivory px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="bg-rani px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ivory">
              -{percentOff}%
            </span>
          )}
        </div>

        {/* Wishlist toggle */}
        <button
          onClick={toggleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 text-ink transition-transform hover:scale-105"
        >
          <Heart size={15} strokeWidth={1.75} fill={wishlisted ? 'currentColor' : 'none'} className={wishlisted ? 'text-rani' : ''} />
        </button>

        {/* Quick view + Add to cart — revealed on hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 ease-silk group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={addToCart}
            className="flex-1 bg-ivory py-2.5 text-xs font-semibold uppercase tracking-wide text-ink hover:bg-gold hover:text-ink"
          >
            Add to Cart
          </button>
          <button
            onClick={quickView}
            aria-label="Quick view"
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-ivory/90 text-ink hover:bg-ivory"
          >
            <Eye size={15} strokeWidth={1.75} />
          </button>
        </div>

        {product.stock <= 10 && (
          <span className="absolute bottom-3 left-3 z-10 text-[10px] font-medium uppercase tracking-wide text-ivory/90">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-wide text-gold-dark">
          {product.quality || product.work}
        </p>
        <h3 className="mt-1 font-display text-base text-ink dark:text-ivory">{product.name}</h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-semibold text-ink dark:text-ivory">
            Rs. {(product.discountPrice ?? product.price).toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-xs text-stone line-through">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}