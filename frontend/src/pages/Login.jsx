import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import FormInput, { FormField } from '../components/ui/FormInput.jsx'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const loading = useAuthStore((s) => s.loading)

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const result = await login(form)
    if (result.success) {
      navigate(location.state?.from ?? '/account')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="container-premium flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <p className="eyebrow text-center">Welcome Back</p>
        <h1 className="mt-2 text-center font-display text-display-md">Login</h1>
        <div className="thread-divider mx-auto my-6 max-w-[100px]" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Email" required>
            <FormInput
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </FormField>
          <FormField label="Password" required>
            <FormInput
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
          </FormField>

          {error && <p className="text-sm text-rani">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald py-3.5 text-sm font-medium uppercase tracking-wide text-ivory hover:bg-emerald-light disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone">
          Don't have an account?{' '}
          <Link to="/register" className="thread-underline text-emerald">Create one</Link>
        </p>
      </div>
    </div>
  )
}