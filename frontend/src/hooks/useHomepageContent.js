import { useState, useEffect } from 'react'
import api from '../lib/api.js'

export function useHomepageContent() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/homepage-content')
      .then((res) => setContent(res.data.data))
      .catch(() => setContent(null))
      .finally(() => setLoading(false))
  }, [])

  return { content, loading }
}