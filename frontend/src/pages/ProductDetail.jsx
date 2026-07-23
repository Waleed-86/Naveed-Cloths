import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Truck, ChevronDown, Heart } from 'lucide-react'
import ImageGallery from '../components/product/ImageGallery.jsx'
import ProductGrid from '../components/product/ProductGrid.jsx'
import RatingStars from '../components/ui/RatingStars.jsx'
import QuantitySelector from '../components/ui/QuantitySelector.jsx'
import { useCartStore } from '../store/useCartStore.js'
import { useWishlistStore, selectIsWishlisted } from '../store/useWishlistStore.js'
import { useProducts } from '../hooks/useProducts.js'
import { useProduct } from '../hooks/useProduct.js'
import { useReviews } from '../hooks/useReviews.js'
import ReviewForm from '../components/product/ReviewForm.jsx'
import { useAuthStore, selectIsAuthenticated } from '../store/useAuthStore.js'

const ACCORDION_SECTIONS = [
  {
    title: 'Description',
    content: (p) =>
      `${p.name} — a ${p.fabric?.toLowerCase() ?? 'quality'} piece crafted for both comfort and presence. ${
        p.quality ? `Part of our ${p.quality.toLowerCase()} line.` : ''
      }`,
  },
  {
    title: 'Fabric & Care',
    content: (p) => `Fabric: ${p.fabric ?? 'N/A'}. Hand wash or dry clean recommended. Iron on low heat, avoid direct sunlight when drying to preserve colour.`,
  },
  {
    title: 'Delivery Information',
    content: () => 'Dispatched within 1-2 business days. Delivery in 3-5 business days nationwide. Cash on Delivery, JazzCash, Easypaisa, bank transfer, and card payments accepted.',
  },
]

export default function ProductDetail() {
  const { slug } = useParams()
  const { product, loading, error } = useProduct(slug)

  const addItem = useCartStore((s) => s.addItem)
  const toggleWishlistItem = useWishlistStore((s) => s.toggleItem)
  const wishlisted = useWishlistStore(product ? selectIsWishlisted(product.id) : () => false)

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [openSection, setOpenSection] = useState(0)
  const [addedMessage, setAddedMessage] = useState(false)

  const { reviews, averageRating, submitReview, refresh: refreshReviews } = useReviews(product?.id)
  const isAuthenticated = useAuthStore(selectIsAuthenticated)

  // Related products — same category, excluding the current item.
  // TODO: replace with a real recommendation endpoint once one exists.
  const relatedParams = product ? { category: product.category, per_page: 5 } : null
  const { products: relatedRaw } = useProducts(relatedParams)
  const related = relatedRaw.filter((p) => p.id !== product?.id).slice(0, 4)
  const frequentlyBought = relatedRaw.filter((p) => p.id !== product?.id).slice(0, 2)

  if (loading) {
    return (
      <div className="container-premium flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-stone">Loading product…</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container-premium flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <h1 className="font-display text-2xl">Product not found</h1>
        <Link to="/" className="thread-underline text-sm text-emerald">Return home</Link>
      </div>
    )
  }

  const hasDiscount = Boolean(product.discountPrice)
  const activeSize = selectedSize ?? product.sizes?.[0] ?? null
  const activeColor = selectedColor ?? product.colors?.[0] ?? null

  return (
    <div className="container-premium py-10">
      {/* Gallery + Info */}
      <div className="grid gap-12 lg:grid-cols-2">
        <ImageGallery tone={product.tone} name={product.name} />

        <div>
          <p className="eyebrow">{product.quality || product.work}</p>
          <h1 className="mt-2 font-display text-display-md">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <RatingStars rating={averageRating} count={reviews.length} />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold">
              Rs. {(product.discountPrice ?? product.price).toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-base text-stone line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-stone">
            Fabric: <span className="text-ink dark:text-ivory">{product.fabric}</span>
            {product.stock <= 10 && <span className="ml-3 text-rani">Only {product.stock} left in stock</span>}
          </p>

          <div className="thread-divider my-6 max-w-[100px]" />

          {/* Color selector */}
          {product.colors?.length > 0 && (
            <div className="mb-5">
              <p className="mb-2 text-xs uppercase tracking-wide text-stone">Colour</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select colour ${color}`}
                    style={{ backgroundColor: color }}
                    className={`h-9 w-9 rounded-full border-2 transition-all ${
                      activeColor === color ? 'border-gold scale-110' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <p className="mb-2 text-xs uppercase tracking-wide text-stone">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] border px-3 py-2 text-xs font-medium uppercase ${
                      activeSize === size
                        ? 'border-emerald bg-emerald text-ivory'
                        : 'border-stone-light/60 hover:border-emerald'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + actions */}
          <div className="flex flex-wrap items-center gap-3">
            <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />
            <button
              onClick={() => {
                addItem(product, { size: activeSize, color: activeColor, quantity })
                setAddedMessage(true)
                setTimeout(() => setAddedMessage(false), 2000)
              }}
              className="flex-1 bg-emerald px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-ivory transition-colors hover:bg-emerald-light"
            >
              {addedMessage ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggleWishlistItem(product)}
              aria-label="Toggle wishlist"
              className="flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-stone-light/60 hover:border-rani"
            >
              <Heart size={18} strokeWidth={1.75} fill={wishlisted ? 'currentColor' : 'none'} className={wishlisted ? 'text-rani' : ''} />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-stone">
            <Truck size={16} strokeWidth={1.5} />
            Delivery in 3-5 business days nationwide
          </div>

          {/* Accordion */}
          <div className="mt-8 divide-y divide-stone-light/40 border-t border-b border-stone-light/40">
            {ACCORDION_SECTIONS.map((section, i) => (
              <div key={section.title}>
                <button
                  onClick={() => setOpenSection(openSection === i ? -1 : i)}
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-medium uppercase tracking-wide"
                >
                  {section.title}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${openSection === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSection === i && (
                  <p className="pb-4 text-sm text-stone">{section.content(product)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20 max-w-2xl">
        <h2 className="mb-6 font-display text-2xl">Reviews</h2>
        <div className="space-y-6">
          {reviews.length === 0 && (
            <p className="text-sm text-stone">No reviews yet — be the first to share your thoughts.</p>
          )}
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-stone-light/40 pb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{review.name}</span>
                <RatingStars rating={review.rating} size={12} />
              </div>
              {review.comment && <p className="mt-2 text-sm text-stone">{review.comment}</p>}
            </div>
          ))}
        </div>

        <ReviewForm
          isAuthenticated={isAuthenticated}
          onSubmit={async (payload) => {
            await submitReview(payload)
            refreshReviews()
          }}
        />
      </section>

      {/* Frequently bought together */}
      {frequentlyBought.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-2xl">Frequently Bought Together</h2>
          <div className="flex flex-wrap items-center gap-6">
            {[product, ...frequentlyBought].map((p, i) => (
              <div key={p.id} className="flex items-center gap-4">
                <div className={`h-20 w-16 shrink-0 bg-gradient-to-br ${p.tone}`} />
                <div className="text-sm">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-stone">Rs. {(p.discountPrice ?? p.price).toLocaleString()}</p>
                </div>
                {i < frequentlyBought.length && <span className="ml-2 text-stone">+</span>}
              </div>
            ))}
            <button className="ml-auto bg-ink px-6 py-3 text-xs font-medium uppercase tracking-wide text-ivory hover:bg-ink-soft dark:bg-ivory dark:text-ink">
              Add All to Cart
            </button>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-2xl">You May Also Like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}