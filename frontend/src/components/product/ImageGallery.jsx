import { useState } from 'react'

// Generates a few tonal variations of the product's gradient to simulate
// multiple angles/shots until real photography is uploaded per product.
function buildViews(tone) {
  return [
    { opacity: 1, rotate: '0deg' },
    { opacity: 0.85, rotate: '2deg' },
    { opacity: 0.7, rotate: '-2deg' },
    { opacity: 0.92, rotate: '1deg' },
  ].map((v, i) => ({ ...v, tone, id: i }))
}

export default function ImageGallery({ tone, name }) {
  const views = buildViews(tone)
  const [active, setActive] = useState(0)

  return (
    <div>
      {/* Main image with hover-zoom */}
      <div className="group relative aspect-[4/5] overflow-hidden bg-ivory-deep dark:bg-ink-soft">
        <div
          className={`h-full w-full bg-gradient-to-br ${tone} transition-transform duration-500 ease-silk group-hover:scale-110`}
          style={{ opacity: views[active].opacity }}
        >
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-8xl text-ivory/15">{name?.[0] ?? 'S'}</span>
          </div>
        </div>
        <span className="absolute bottom-3 right-3 rounded-full bg-ivory/85 px-3 py-1 text-[10px] uppercase tracking-wide text-ink opacity-0 transition-opacity group-hover:opacity-100">
          Hover to zoom
        </span>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-4 gap-3">
        {views.map((view, i) => (
          <button
            key={view.id}
            onClick={() => setActive(i)}
            aria-label={`View ${i + 1}`}
            className={`aspect-[4/5] bg-gradient-to-br ${tone} transition-all ${
              active === i ? 'ring-2 ring-emerald ring-offset-2' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ opacity: active === i ? 1 : undefined }}
          />
        ))}
      </div>
    </div>
  )
}