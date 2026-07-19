import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import FormInput, { FormField } from '../components/ui/FormInput.jsx'

export default function Register() {
  const navigate = useNavigate()
  const register = useAuthStore((s) => s.register)
  const loading = useAuthStore((s) => s.loading)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', password_confirmation: '',
  })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setFieldErrors({})
    const result = await register(form)
    if (result.success) {
      navigate('/account')
    } else {
      setError(result.error)
      setFieldErrors(result.fieldErrors ?? {})
    }
  }

  return (
    <div className="container-premium flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <p className="eyebrow text-center">Join SILA</p>
        <h1 className="mt-2 text-center font-display text-display-md">Create Account</h1>
        <div className="thread-divider mx-auto my-6 max-w-[100px]" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Full Name" required error={fieldErrors.name?.[0]}>
            <FormInput required value={form.name} onChange={(e) => update('name', e.target.value)} error={fieldErrors.name} />
          </FormField>
          <FormField label="Email" required error={fieldErrors.email?.[0]}>
            <FormInput type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} error={fieldErrors.email} />
          </FormField>
          <FormField label="Phone Number">
            <FormInput type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="03XXXXXXXXX" />
          </FormField>
          <FormField label="Password" required error={fieldErrors.password?.[0]}>
            <FormInput type="password" required minLength={8} value={form.password} onChange={(e) => update('password', e.target.value)} error={fieldErrors.password} />
          </FormField>
          <FormField label="Confirm Password" required>
            <FormInput
              type="password"
              required
              value={form.password_confirmation}
              onChange={(e) => update('password_confirmation', e.target.value)}
            />
          </FormField>

          {error && <p className="text-sm text-rani">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald py-3.5 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone">
          Already have an account?{' '}
          <Link to="/login" className="thread-underline text-emerald">Sign in</Link>
        </p>
      </div>
    </div>
  )
}