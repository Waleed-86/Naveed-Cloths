import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

export default function ReviewForm({ isAuthenticated, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  if (!isAuthenticated) {
    return (
      <p className="mt-8 text-sm text-stone">
        <Link to="/login" className="thread-underline text-emerald">Sign in</Link> to leave a review.
      </p>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (rating === 0) return
    setSubmitting(true)
    setStatus(null)
    try {
      await onSubmit({ rating, comment: comment.trim() || null })
      setStatus('success')
      setRating(0)
      setComment('')
    } catch (err) {
      setStatus(err.response?.data?.message || 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-t border-stone-light/40 pt-8">
      <p className="text-sm font-medium">Write a review</p>

      <div className="mt-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              size={22}
              strokeWidth={1.5}
              className={(hoverRating || rating) >= star ? 'text-gold' : 'text-stone-light'}
              fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this product (optional)"
        rows={3}
        className="mt-3 w-full border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
      />

      <button
        type="submit"
        disabled={rating === 0 || submitting}
        className="mt-3 bg-emerald px-6 py-2.5 text-xs font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Submit Review'}
      </button>

      {status === 'success' && (
        <p className="mt-2 text-sm text-emerald">Thanks! Your review will appear once approved.</p>
      )}
      {status && status !== 'success' && (
        <p className="mt-2 text-sm text-rani">{status}</p>
      )}
    </form>
  )
}