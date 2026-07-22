const FLOW = ['pending', 'confirmed', 'packed', 'shipped', 'delivered']

export default function OrderTimeline({ status }) {
  if (status === 'cancelled' || status === 'returned') {
    return (
      <div className="border border-rani/40 bg-rani/5 p-4 text-sm text-rani">
        This order was {status}.
      </div>
    )
  }

  const currentIndex = FLOW.indexOf(status)

  return (
    <div className="flex items-center">
      {FLOW.map((step, i) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                i <= currentIndex ? 'bg-emerald text-ivory' : 'border border-stone-light text-stone-light'
              }`}
            >
              {i + 1}
            </div>
            <span className={`mt-2 text-[10px] uppercase tracking-wide ${i <= currentIndex ? 'text-emerald' : 'text-stone-light'}`}>
              {step}
            </span>
          </div>
          {i < FLOW.length - 1 && (
            <div className={`mx-2 h-px flex-1 ${i < currentIndex ? 'bg-emerald' : 'bg-stone-light/50'}`} />
          )}
        </div>
      ))}
    </div>
  )
}