import { useState, useEffect, useCallback } from 'react'
import api from '../lib/api.js'

export function useReviews(productId) {
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    if (!productId) return
    setLoading(true)
    api
      .get(`/products/${productId}/reviews`)
      .then((res) => {
        setReviews(res.data.data ?? [])
        setAverageRating(res.data.average_rating ?? 0)
      })
      .finally(() => setLoading(false))
  }, [productId])

  useEffect(load, [load])

  async function submitReview({ rating, comment }) {
    await api.post(`/products/${productId}/reviews`, { rating, comment })
    // Newly submitted reviews need admin approval before they're public, so
    // we don't optimistically add it to the visible list — just confirm.
  }

  return { reviews, averageRating, loading, submitReview, refresh: load }
}