export default function About() {
  return (
    <div className="container-premium py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">Our Story</p>
        <h1 className="mt-2 font-display text-display-md">About SILA</h1>
        <div className="thread-divider my-6 max-w-[100px]" />

        <div className="space-y-5 text-sm leading-relaxed text-stone">
          <p>
            SILA began as a single tailoring counter, built on the belief that
            clothing should feel considered — fabric chosen with intent, cuts
            that respect how people actually move through their day, and
            embroidery that means something rather than decorating for its
            own sake.
          </p>
          <p>
            Today that same philosophy carries through everything we make,
            from everyday essentials to fully embroidered formal wear. Every
            piece is inspected by hand before it reaches you, because a
            garment that doesn't hold up isn't worth making in the first
            place.
          </p>
          <p>
            We're proud to be a Pakistani brand, sourcing fabric locally
            where we can and working with artisans who've spent years
            perfecting their craft. Moving online doesn't change any of
            that — it just means more people get to wear it.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-stone-light/40 pt-8">
          <div>
            <p className="font-display text-3xl text-emerald">10+</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-stone">Years of craft</p>
          </div>
          <div>
            <p className="font-display text-3xl text-emerald">50k+</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-stone">Happy customers</p>
          </div>
          <div>
            <p className="font-display text-3xl text-emerald">100%</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-stone">Nationwide delivery</p>
          </div>
        </div>
      </div>
    </div>
  )
}