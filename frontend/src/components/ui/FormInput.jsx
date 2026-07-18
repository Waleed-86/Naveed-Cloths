export function FormField({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wide text-stone">
        {label} {required && <span className="text-rani">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-rani">{error}</span>}
    </label>
  )
}

export default function FormInput({ error, className = '', ...props }) {
  return (
    <input
      {...props}
      className={`w-full border bg-transparent px-3.5 py-2.5 text-sm focus:outline-none ${
        error ? 'border-rani' : 'border-stone-light/60 focus:border-emerald'
      } ${className}`}
    />
  )
}