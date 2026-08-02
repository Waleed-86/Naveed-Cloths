import { useState, useEffect } from 'react'
import api from '../../lib/api.js'

export default function AdminHomepage() {
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    api
      .get('/admin/homepage-content')
      .then((res) => setForm(res.data.data))
      .catch(() => setError('Could not load homepage content.'))
      .finally(() => setLoading(false))
  }, [])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setSuccess(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      const res = await api.put('/admin/homepage-content', form)
      setForm(res.data.data)
      setSuccess(true)
    } catch {
      setError('Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-stone">Loading…</p>
  if (!form) return <p className="text-sm text-rani">{error}</p>

  const fields = [
    { key: 'announcement_text', label: 'Announcement Bar Text', section: 'Announcement Bar' },
    { key: 'hero_eyebrow', label: 'Small Label Above Headline', section: 'Hero Section' },
    { key: 'hero_headline', label: 'Main Headline' },
    { key: 'hero_subheadline', label: 'Subheadline', textarea: true },
    { key: 'hero_cta_primary_label', label: 'Primary Button Text' },
    { key: 'hero_cta_primary_link', label: 'Primary Button Link (e.g. /women)' },
    { key: 'hero_cta_secondary_label', label: 'Secondary Button Text' },
    { key: 'hero_cta_secondary_link', label: 'Secondary Button Link (e.g. /men)' },
    { key: 'hero_featured_label', label: 'Featured Panel Caption' },
  ]

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl">Homepage Content</h1>
      <p className="mt-2 text-sm text-stone">
        Changes here update the live announcement bar and hero section on the homepage immediately after saving.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {fields.map((field) => (
          <div key={field.key}>
            {field.section && (
              <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-gold-dark first:mt-0">
                {field.section}
              </p>
            )}
            <label className="mb-1.5 block text-xs uppercase tracking-wide text-stone">{field.label}</label>
            {field.textarea ? (
              <textarea
                rows={3}
                value={form[field.key] || ''}
                onChange={(e) => update(field.key, e.target.value)}
                className="w-full border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={form[field.key] || ''}
                onChange={(e) => update(field.key, e.target.value)}
                className="w-full border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
              />
            )}
          </div>
        ))}

        {error && <p className="text-sm text-rani">{error}</p>}
        {success && <p className="text-sm text-emerald">Saved — check the homepage to see it live.</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-emerald px-8 py-3 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}