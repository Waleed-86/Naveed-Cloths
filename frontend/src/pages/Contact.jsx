import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
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
              <p className="text-sm text-stone">support@naveedcloths.pk</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-emerald" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-stone">
                Hafiz Naveed: <a href="tel:+923455557126" className="hover:text-emerald">0345-5557126</a>,{' '}
                <a href="tel:+923015276376" className="hover:text-emerald">0301-5276376</a>
              </p>
              <p className="text-sm text-stone">
                Aqib Anwar: <a href="tel:+923453868146" className="hover:text-emerald">0345-3868146</a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-emerald" />
            <div>
              <p className="text-sm font-medium">Store</p>
              <p className="text-sm text-stone">Nawab Khan Market, Mansehra</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-emerald" />
            <div>
              <p className="text-sm font-medium">Hours</p>
              <p className="text-sm text-stone">Mon–Thu & Sat–Sun: 9am – 6pm</p>
              <p className="text-sm text-stone">Friday: Closed (occasionally open 9am–12pm)</p>
            </div>
          </div>

          <a
            href="https://wa.me/923455557126"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 bg-emerald px-6 py-3 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.1.2-.3.3-.5.1-.2 0-.4 0-.5C10.2 9 9.7 7.6 9.5 7c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4z"/>
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.6 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.7 3.6 13.4 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.4-8.4 8.4z"/>
            </svg>
            WhatsApp Us
          </a>

          <div className="flex gap-3 pt-1">
            <a
              href="https://www.facebook.com/share/17KQ2mXsXS/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-stone-light/60 p-2 hover:border-emerald hover:text-emerald"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v3H7v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/hafizsb126"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-stone-light/60 p-2 hover:border-emerald hover:text-emerald"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          {submitted ? (
            <div className="border border-emerald/40 bg-emerald/5 p-6">
              <p className="font-display text-xl text-emerald">Message sent</p>
              <p className="mt-2 text-sm text-stone">
                Thanks for reaching out — we'll get back to you as soon as we can.
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