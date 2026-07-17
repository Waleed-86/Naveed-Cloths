import { useState, useMemo } from 'react'
import ProductGrid from '../components/product/ProductGrid.jsx'
import { MOCK_PRODUCTS } from '../data/mockProducts.js'

const STEPS = [
  {
    key: 'pieces',
    question: 'Choose your piece count',
    options: ['2 Piece', '3 Piece'],
  },
  {
    key: 'stitching',
    question: 'Choose stitching',
    options: ['Stitched', 'Unstitched'],
  },
  {
    key: 'work',
    question: 'Choose the finish',
    options: ['Simple Printed', 'Embroidered / Fancy Work'],
  },
]

export default function Women() {
  const [answers, setAnswers] = useState({ pieces: null, stitching: null, work: null })
  const [stepIndex, setStepIndex] = useState(0)

  const isComplete = answers.pieces && answers.stitching && answers.work

  const matchedProducts = useMemo(() => {
    if (!isComplete) return []
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.category === 'women' &&
        p.pieces === answers.pieces &&
        p.stitching === answers.stitching &&
        p.work === answers.work
    )
  }, [answers, isComplete])

  function selectOption(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1)
  }

  function reset() {
    setAnswers({ pieces: null, stitching: null, work: null })
    setStepIndex(0)
  }

  return (
    <div className="container-premium py-12">
      <p className="eyebrow">Collection</p>
      <h1 className="mt-2 font-display text-display-md">Women's Collection</h1>
      <p className="mt-3 max-w-lg text-sm text-stone">
        Tell us what you're looking for and we'll show you exactly that —
        no scrolling through hundreds of unrelated pieces.
      </p>
      <div className="thread-divider my-8 max-w-[140px]" />

      {/* Step progress */}
      <div className="mb-10 flex items-center gap-3">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex items-center gap-3">
            <button
              onClick={() => answers[step.key] && setStepIndex(i)}
              disabled={!answers[step.key] && i !== stepIndex}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                answers[step.key]
                  ? 'bg-emerald text-ivory'
                  : i === stepIndex
                  ? 'border border-emerald text-emerald'
                  : 'border border-stone-light text-stone-light'
              }`}
            >
              {i + 1}
            </button>
            {i < STEPS.length - 1 && <div className="h-px w-8 bg-stone-light/60" />}
          </div>
        ))}
        {isComplete && (
          <button onClick={reset} className="thread-underline ml-4 text-xs uppercase tracking-wide text-stone">
            Start Over
          </button>
        )}
      </div>

      {!isComplete ? (
        <div key={STEPS[stepIndex].key}>
          <h2 className="mb-6 font-display text-2xl">{STEPS[stepIndex].question}</h2>
          <div className="grid max-w-xl grid-cols-2 gap-4">
            {STEPS[stepIndex].options.map((option) => (
              <button
                key={option}
                onClick={() => selectOption(STEPS[stepIndex].key, option)}
                className="group flex aspect-[4/3] flex-col items-center justify-center gap-2 border border-stone-light/60 bg-ivory-deep px-4 text-center transition-all duration-300 ease-silk hover:border-emerald hover:bg-emerald hover:text-ivory dark:bg-ink-soft"
              >
                <span className="font-display text-lg">{option}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {[answers.pieces, answers.stitching, answers.work].map((tag) => (
              <span key={tag} className="bg-ivory-deep px-3 py-1 text-xs uppercase tracking-wide text-stone dark:bg-ink-soft">
                {tag}
              </span>
            ))}
          </div>
          <ProductGrid products={matchedProducts} />
        </div>
      )}
    </div>
  )
}