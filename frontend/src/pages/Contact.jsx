import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import FormInput, { FormField } from '../components/ui/FormInput.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: wire to a real POST /api/contact endpoint once it exists
    setSubmitted(true)
  }

  return (
    <div className="container-premium py-16">
      <p className="eyebrow">Get in Touch</p>
      <h1 className="mt-2 font-display text-display-md">Contact Us</h1>
      <div className="thread-divider my-6 max-w-[100px]" />

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="flex items-start gap-3">
            <Mail size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-emerald" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-stone">support@sila.pk</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-emerald" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-stone">+92 300 1234567</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-emerald" />
            <div>
              <p className="text-sm font-medium">Studio</p>
              <p className="text-sm text-stone">Gulberg III, Lahore, Pakistan</p>
            </div>
          </div>
          <p className="text-xs text-stone">
            Support hours: Monday–Saturday, 10am–7pm PKT
          </p>
        </div>

        <div className="lg:col-span-2">
          {submitted ? (
            <div className="border border-emerald/40 bg-emerald/5 p-6">
              <p className="font-display text-xl text-emerald">Message sent</p>
              <p className="mt-2 text-sm text-stone">
                Thanks for reaching out — we'll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Name" required>
                  <FormInput required value={form.name} onChange={(e) => update('name', e.target.value)} />
                </FormField>
                <FormField label="Email" required>
                  <FormInput type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} />
                </FormField>
              </div>
              <FormField label="Subject" required>
                <FormInput required value={form.subject} onChange={(e) => update('subject', e.target.value)} />
              </FormField>
              <FormField label="Message" required>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="w-full border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
                />
              </FormField>
              <button
                type="submit"
                className="bg-emerald px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}