export default function PolicyPage({ policy }) {
  return (
    <div className="container-premium py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">Policy</p>
        <h1 className="mt-2 font-display text-display-md">{policy.title}</h1>
        <div className="thread-divider my-6 max-w-[100px]" />

        <div className="space-y-8">
          {policy.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-lg">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone">{section.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-stone">
          Last updated: {new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>
    </div>
  )
}