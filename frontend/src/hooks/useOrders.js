import { useState, useEffect } from 'react'
import api from '../lib/api.js'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    api
      .get('/orders')
      .then((res) => {
        if (!cancelled) setOrders(res.data.data ?? [])
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
  }, [])

  return { orders, loading, error }
}