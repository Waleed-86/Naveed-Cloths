export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-ivory-deep dark:bg-ink-soft" />
      <div className="mt-3 space-y-2">
        <div className="h-2.5 w-1/3 rounded bg-ivory-deep dark:bg-ink-soft" />
        <div className="h-3.5 w-3/4 rounded bg-ivory-deep dark:bg-ink-soft" />
        <div className="h-3 w-1/2 rounded bg-ivory-deep dark:bg-ink-soft" />
      </div>
    </div>
  )
}