const STATUS_STYLES = {
  pending: 'bg-stone-light/40 text-stone',
  confirmed: 'bg-gold/20 text-gold-dark',
  packed: 'bg-gold/20 text-gold-dark',
  shipped: 'bg-emerald/15 text-emerald',
  delivered: 'bg-emerald text-ivory',
  cancelled: 'bg-rani/15 text-rani',
  returned: 'bg-rani/15 text-rani',
}

export default function OrderStatusBadge({ status }) {
  return (
    <span className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[status] ?? STATUS_STYLES.pending}`}>
      {status}
    </span>
  )
}