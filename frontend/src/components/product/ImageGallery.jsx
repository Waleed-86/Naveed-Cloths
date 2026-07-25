import { useState } from 'react'

// Generates a few tonal variations of the product's gradient to simulate
// multiple angles/shots for products that don't have real photography
// uploaded yet.
function buildPlaceholderViews(tone) {
  return [
    { opacity: 1 },
    { opacity: 0.85 },
    { opacity: 0.7 },
    { opacity: 0.92 },
  ].map((v, i) => ({ ...v, tone, id: i }))
}

export default function ImageGallery({ tone, name, images = [] }) {
  const hasRealImages = images.length > 0
  const placeholderViews = hasRealImages ? [] : buildPlaceholderViews(tone)
  const [active, setActive] = useState(0)

  return (
    <div>
      {/* Main image with hover-zoom */}
      <div className="group relative aspect-[4/5] overflow-hidden bg-ivory-deep dark:bg-ink-soft">
        {hasRealImages ? (
          <img
            src={images[active].url}
            alt={images[active].alt_text || name}
            className="h-full w-full object-cover transition-transform duration-500 ease-silk group-hover:scale-110"
          />
        ) : (
          <>
            <div
              className={`h-full w-full bg-gradient-to-br ${tone} transition-transform duration-500 ease-silk group-hover:scale-110`}
              style={{ opacity: placeholderViews[active].opacity }}
            >
              <div className="flex h-full items-center justify-center">
                <span className="font-display text-8xl text-ivory/15">{name?.[0] ?? 'S'}</span>
              </div>
            </div>
            <span className="absolute bottom-3 right-3 rounded-full bg-ivory/85 px-3 py-1 text-[10px] uppercase tracking-wide text-ink opacity-0 transition-opacity group-hover:opacity-100">
              Hover to zoom
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {(hasRealImages ? images.length > 1 : true) && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {(hasRealImages ? images : placeholderViews).map((view, i) => (
            <button
              key={view.id}
              onClick={() => setActive(i)}
              aria-label={`View ${i + 1}`}
              className={`aspect-[4/5] overflow-hidden transition-all ${
                active === i ? 'ring-2 ring-emerald ring-offset-2' : 'opacity-70 hover:opacity-100'
              } ${hasRealImages ? '' : `bg-gradient-to-br ${tone}`}`}
              style={hasRealImages ? undefined : { opacity: active === i ? 1 : undefined }}
            >
              {hasRealImages && (
                <img src={view.url} alt={view.alt_text || name} className="h-full w-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}