import { Star } from 'lucide-react'

export default function RatingStars({ rating = 0, count, size = 14 }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={i < Math.round(rating) ? 'text-gold' : 'text-stone-light'}
            fill={i < Math.round(rating) ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      {typeof count === 'number' && (
        <span className="text-xs text-stone">({count})</span>
      )}
    </div>
  )
}