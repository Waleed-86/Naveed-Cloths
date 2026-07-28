import { useState } from 'react'
import api from '../../lib/api.js'
import FormInput, { FormField } from '../../components/ui/FormInput.jsx'

export default function ChangePassword() {
  const [form, setForm] = useState({ current_password: '', password: '', password_confirmation: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      await api.put('/me/password', form)
      setSuccess(true)
      setForm({ current_password: '', password: '', password_confirmation: '' })
    } catch (err) {
      const messages = err.response?.data?.errors
      setError(messages ? Object.values(messages).flat().join(' ') : 'Failed to update password.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl">Change Password</h2>

      <form onSubmit={handleSubmit} className="mt-6 max-w-sm space-y-5">
        <FormField label="Current Password" required>
          <FormInput
            type="password"
            required
            value={form.current_password}
            onChange={(e) => update('current_password', e.target.value)}
          />
        </FormField>
        <FormField label="New Password" required>
          <FormInput
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
          />
        </FormField>
        <FormField label="Confirm New Password" required>
          <FormInput
            type="password"
            required
            value={form.password_confirmation}
            onChange={(e) => update('password_confirmation', e.target.value)}
          />
        </FormField>

        {error && <p className="text-sm text-rani">{error}</p>}
        {success && <p className="text-sm text-emerald">Password updated successfully.</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-emerald px-8 py-3 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60"
        >
          {saving ? 'Updating…' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}