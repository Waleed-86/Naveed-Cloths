export default function About() {
  return (
    <div className="container-premium py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">Our Story</p>
        <h1 className="mt-2 font-display text-display-md">About Naveed Cloths</h1>
        <div className="thread-divider my-6 max-w-[100px]" />

        <div className="space-y-5 text-sm leading-relaxed text-stone">
          <p>
            Naveed Cloths opened its doors in 2017 in Nawab Khan Market,
            Mansehra — and in the years since, what's kept our shutters up
            has never been advertising or trends. It's been something
            simpler: customers who come back, and who send their family and
            friends to us too. That kind of trust isn't built overnight, and
            we don't take it lightly.
          </p>
          <p>
            Every piece we stock is sourced from Pakistan's finest textile
            mills — fabric chosen for how it wears, not just how it
            photographs. We currently offer readymade suits rather than
            custom tailoring, which means every size and cut you see is one
            we've personally checked for quality before it reaches our
            shelves.
          </p>
          <p>
            Behind the counter, it's a two-man operation — Hafiz Naveed and
            Aqib Anwar — which is really just another way of saying that
            when you shop with us, you're dealing directly with the people
            who care whether you're happy with your purchase, not a call
            centre. Moving online doesn't change that; it just means more
            people get to experience it.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-stone-light/40 pt-8">
          <div>
            <p className="font-display text-3xl text-emerald">2017</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-stone">Est. in Mansehra</p>
          </div>
          <div>
            <p className="font-display text-3xl text-emerald">1000s</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-stone">Customers served</p>
          </div>
          <div>
            <p className="font-display text-3xl text-emerald">2</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-stone">Brothers behind the counter</p>
          </div>
        </div>
      </div>
    </div>
  )
}