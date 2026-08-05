import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import api from '../lib/api.js'
import FormInput, { FormField } from '../components/ui/FormInput.jsx'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token') || ''
  const email = searchParams.get('email') || ''

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/reset-password', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      navigate('/login', { state: { justReset: true } })
    } catch (err) {
      const messages = err.response?.data?.errors
      setError(messages ? Object.values(messages).flat().join(' ') : 'This reset link is invalid or has expired.')
    } finally {
      setLoading(false)
    }
  }

  if (!token || !email) {
    return (
      <div className="container-premium flex min-h-[70vh] flex-col items-center justify-center gap-3 py-16 text-center">
        <h1 className="font-display text-2xl">Invalid Reset Link</h1>
        <p className="text-sm text-stone">This password reset link is missing required information.</p>
        <Link to="/forgot-password" className="thread-underline text-sm text-emerald">Request a new link</Link>
      </div>
    )
  }

  return (
    <div className="container-premium flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <p className="eyebrow text-center">Reset Password</p>
        <h1 className="mt-2 text-center font-display text-display-md">Set New Password</h1>
        <div className="thread-divider mx-auto my-6 max-w-[100px]" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="New Password" required>
            <FormInput
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          <FormField label="Confirm New Password" required>
            <FormInput
              type="password"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </FormField>

          {error && <p className="text-sm text-rani">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald py-3.5 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60"
          >
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}