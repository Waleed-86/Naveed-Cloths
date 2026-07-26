import { useState, useEffect } from 'react'
import api from '../lib/api.js'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/categories')
      .then((res) => setCategories(res.data.data ?? []))
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}
