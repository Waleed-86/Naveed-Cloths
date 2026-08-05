import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api.js'
import FormInput, { FormField } from '../components/ui/FormInput.jsx'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/forgot-password', { email })
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-premium flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <p className="eyebrow text-center">Reset Password</p>
        <h1 className="mt-2 text-center font-display text-display-md">Forgot Password?</h1>
        <div className="thread-divider mx-auto my-6 max-w-[100px]" />

        {submitted ? (
          <div className="border border-emerald/40 bg-emerald/5 p-5 text-center">
            <p className="text-sm text-stone">
              If an account exists for <strong className="text-ink dark:text-ivory">{email}</strong>,
              a password reset link has been sent. Check your inbox (and spam folder).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField label="Email" required>
              <FormInput type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormField>

            {error && <p className="text-sm text-rani">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald py-3.5 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-stone">
          <Link to="/login" className="thread-underline text-emerald">Back to Sign In</Link>
        </p>
      </div>
    </div>
  )
}