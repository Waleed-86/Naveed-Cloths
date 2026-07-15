import { Link } from 'react-router-dom'

const CATEGORIES = [
  {
    label: 'Men',
    to: '/men',
    tone: 'from-ink to-ink-soft',
    copy: 'Tailored formals, casuals & premium fabric essentials',
  },
  {
    label: 'Women',
    to: '/women',
    tone: 'from-emerald-dark to-emerald',
    copy: 'Stitched & unstitched — 2 piece, 3 piece, embroidered',
  },
  {
    label: 'Sale',
    to: '/sale',
    tone: 'from-rani to-rani-light',
    copy: 'Limited-time offers on select collections',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ivory-deep dark:bg-ink-soft">
        <div className="container-premium grid min-h-[85vh] items-center gap-12 py-16 lg:grid-cols-2 lg:py-0">
          <div className="max-w-xl">
            <p className="eyebrow">New Season · 2026</p>
            <h1 className="mt-4 font-display text-display-lg md:text-display-xl">
              Stitched with intention.
            </h1>
            <div className="thread-divider my-6 max-w-[140px]" />
            <p className="max-w-md text-base text-ink/70 dark:text-ivory/70 md:text-lg">
              Premium Pakistani fashion for men and women — from everyday
              essentials to fully embroidered formal wear, delivered nationwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/women"
                className="bg-emerald px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-ivory transition-colors hover:bg-emerald-light"
              >
                Shop Women
              </Link>
              <Link
                to="/men"
                className="border border-ink px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-ivory dark:border-ivory dark:text-ivory dark:hover:bg-ivory dark:hover:text-ink"
              >
                Shop Men
              </Link>
            </div>
          </div>

          {/* Editorial panel — swap for real campaign photography when available */}
          <div className="relative hidden aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-br from-emerald to-emerald-dark lg:flex">
            <span className="font-display text-9xl text-gold/20">S</span>
            <div className="absolute bottom-8 left-8 right-8 border-t border-ivory/20 pt-4">
              <p className="text-xs uppercase tracking-widest2 text-ivory/70">Featured</p>
              <p className="mt-1 font-display text-xl text-ivory">The Zardozi Edit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="container-premium py-20 md:py-28">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow">Explore</p>
            <h2 className="mt-2 font-display text-display-md">Shop by Category</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className={`group relative flex aspect-[3/4] flex-col justify-end overflow-hidden bg-gradient-to-br p-6 shadow-card transition-shadow duration-300 hover:shadow-cardHover ${cat.tone}`}
            >
              <div className="relative z-10">
                <h3 className="thread-underline font-display text-2xl text-ivory">{cat.label}</h3>
                <p className="mt-2 max-w-[220px] text-sm text-ivory/75">{cat.copy}</p>
              </div>
              <span className="absolute right-6 top-6 z-10 text-xs uppercase tracking-widest2 text-ivory/60 transition-transform duration-300 ease-silk group-hover:translate-x-1">
                View →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}