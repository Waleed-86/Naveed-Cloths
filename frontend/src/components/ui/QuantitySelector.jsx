import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99 }) {
  function step(delta) {
    const next = quantity + delta
    if (next >= min && next <= max) onChange(next)
  }

  return (
    <div className="inline-flex items-center border border-stone-light/60">
      <button
        onClick={() => step(-1)}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="flex h-10 w-10 items-center justify-center text-ink hover:bg-ivory-deep disabled:opacity-30 dark:text-ivory dark:hover:bg-ink-soft"
      >
        <Minus size={14} strokeWidth={2} />
      </button>
      <span className="w-10 text-center text-sm font-medium">{quantity}</span>
      <button
        onClick={() => step(1)}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="flex h-10 w-10 items-center justify-center text-ink hover:bg-ivory-deep disabled:opacity-30 dark:text-ivory dark:hover:bg-ink-soft"
      >
        <Plus size={14} strokeWidth={2} />
      </button>
    </div>
  )
}