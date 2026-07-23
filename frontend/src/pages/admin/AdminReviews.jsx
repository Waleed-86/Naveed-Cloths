import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/api.js'
import RatingStars from '../../components/ui/RatingStars.jsx'

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('pending')
  const [actingId, setActingId] = useState(null)

  function load() {
    setLoading(true)
    api
      .get('/admin/reviews', { params: statusFilter ? { status: statusFilter } : {} })
      .then((res) => setReviews(res.data.data ?? []))
      .finally(() => setLoading(false))
  }

  useEffect(load, [statusFilter])

  async function handleApprove(review) {
    setActingId(review.id)
    try {
      await api.patch(`/admin/reviews/${review.id}/approve`)
      // If we're viewing the Pending tab, an approved review no longer
      // belongs here — remove it. Otherwise just flip its local flag.
      if (statusFilter === 'pending') {
        setReviews((prev) => prev.filter((r) => r.id !== review.id))
      } else {
        setReviews((prev) => prev.map((r) => (r.id === review.id ? { ...r, is_approved: true } : r)))
      }
    } finally {
      setActingId(null)
    }
  }

  async function handleReject(review) {
    setActingId(review.id)
    try {
      await api.patch(`/admin/reviews/${review.id}/reject`)
      if (statusFilter === 'approved') {
        setReviews((prev) => prev.filter((r) => r.id !== review.id))
      } else {
        setReviews((prev) => prev.map((r) => (r.id === review.id ? { ...r, is_approved: false } : r)))
      }
    } finally {
      setActingId(null)
    }
  }

  async function handleDelete(review) {
    if (!confirm('Delete this review permanently?')) return
    setActingId(review.id)
    try {
      await api.delete(`/admin/reviews/${review.id}`)
      setReviews((prev) => prev.filter((r) => r.id !== review.id))
    } finally {
      setActingId(null)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl">Reviews</h1>
        <div className="flex gap-2">
          {[
            { key: 'pending', label: 'Pending' },
            { key: 'approved', label: 'Approved' },
            { key: '', label: 'All' },
          ].map((tab) => (
            <button
              key={tab.key || 'all'}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wide ${
                statusFilter === tab.key ? 'bg-emerald text-ivory' : 'border border-stone-light/60 text-stone'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 divide-y divide-stone-light/40 bg-ivory dark:bg-ink-soft">
        {loading ? (
          <p className="p-5 text-sm text-stone">Loading…</p>
        ) : reviews.length === 0 ? (
          <p className="p-5 text-sm text-stone">No reviews here.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{review.user?.name}</span>
                    <RatingStars rating={review.rating} size={13} />
                  </div>
                  <Link to={`/product/${review.product?.slug}`} className="thread-underline mt-1 inline-block text-xs text-stone">
                    on {review.product?.name}
                  </Link>
                  {review.comment && <p className="mt-2 max-w-xl text-sm text-stone">{review.comment}</p>}
                </div>
                <div className="flex shrink-0 gap-3 text-xs">
                  {!review.is_approved && (
                    <button
                      onClick={() => handleApprove(review)}
                      disabled={actingId === review.id}
                      className="text-emerald hover:underline disabled:opacity-50"
                    >
                      Approve
                    </button>
                  )}
                  {review.is_approved && (
                    <button
                      onClick={() => handleReject(review)}
                      disabled={actingId === review.id}
                      className="text-gold-dark hover:underline disabled:opacity-50"
                    >
                      Unapprove
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review)}
                    disabled={actingId === review.id}
                    className="text-rani hover:underline disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}