import { useState, useEffect } from 'react'
import api from '../lib/api.js'

// Placeholder gradient tones (until real product photography is uploaded per product)
const TONES = [
  'from-emerald-dark to-emerald',
  'from-stone to-ink-soft',
  'from-stone-light to-stone',
  'from-rani to-rani-light',
  'from-gold to-gold-dark',
  'from-ink to-emerald-dark',
]
function inferTone(id) {
  return TONES[id % TONES.length]
}

// Display label <-> backend enum value maps, used on the way in (query params)
// and the way out (normalizing API responses back to what the UI expects).
export const QUALITY_LABELS = { premium: 'Premium Quality', medium: 'Medium Quality', budget: 'Budget Friendly' }
export const PIECE_VALUES = { '2 Piece': '2_piece', '3 Piece': '3_piece' }
export const PIECE_LABELS = { '2_piece': '2 Piece', '3_piece': '3 Piece' }
export const STITCH_VALUES = { Stitched: 'stitched', Unstitched: 'unstitched' }
export const STITCH_LABELS = { stitched: 'Stitched', unstitched: 'Unstitched' }
export const WORK_VALUES = { 'Simple Printed': 'simple_printed', 'Embroidered / Fancy Work': 'embroidered' }
export const WORK_LABELS = { simple_printed: 'Simple Printed', embroidered: 'Embroidered / Fancy Work' }

// Normalizes the Laravel API's snake_case shape into the camelCase shape
// ProductCard/ProductDetail/ProductGrid already expect (matching the old
// mockProducts.js shape), so those components don't need to change.
export export function normalizeProduct(p) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category?.type,
    quality: p.quality ? QUALITY_LABELS[p.quality] : null,
    pieces: p.pieces ? PIECE_LABELS[p.pieces] : null,
    stitching: p.stitching ? STITCH_LABELS[p.stitching] : null,
    work: p.work_type ? WORK_LABELS[p.work_type] : null,
    fabric: p.fabric,
    price: p.price,
    discountPrice: p.discount_price,
    colors: p.colors ?? [],
    sizes: p.sizes ?? [],
    stock: p.stock,
    isNew: p.is_new,
    tone: inferTone(p.id),
  }
}

/**
 * Fetches products from GET /api/products with the given query params.
 * Pass `params` as null/undefined to skip fetching entirely (e.g. Women's
 * guided flow, before all three steps are answered).
 */
export function useProducts(params) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(Boolean(params))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!params) {
      setProducts([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    api
      .get('/products', { params })
      .then((res) => {
        if (cancelled) return
        setProducts((res.data.data ?? []).map(normalizeProduct))
        setError(null)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)])

  return { products, loading, error }
}

/**
 * Fetches a single product by slug from GET /api/products/{slug}.
 * Pass null/undefined slug to skip fetching.
 */
export function useProduct(slug) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(Boolean(slug))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) {
      setProduct(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    api
      .get(`/products/${slug}`)
      .then((res) => {
        if (!cancelled) {
          setProduct(normalizeProduct(res.data.data))
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setProduct(null)
          setError(err)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { product, loading, error }
}