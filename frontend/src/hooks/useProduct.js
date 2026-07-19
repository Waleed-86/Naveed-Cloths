import { useState, useEffect } from 'react'
import api from '../lib/api.js'
import { normalizeProduct } from './useProducts.js'

export function useProduct(slug) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    let cancelled = false
    setLoading(true)

    api
      .get(`/products/${slug}`)
      .then((res) => {
        if (cancelled) return
        setProduct(normalizeProduct(res.data.data))
        setError(null)
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