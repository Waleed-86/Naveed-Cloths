import { useState, useEffect } from 'react'
import api from '../../lib/api.js'

export default function AdminSecurity() {
  const [attempts, setAttempts] = useState([])
  const [lockedEmails, setLockedEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      api
        .get('/admin/security/login-attempts', {
          params: { email: search || undefined, status: statusFilter || undefined },
        })
        .then((res) => {
          setAttempts(res.data.data?.data ?? [])
          setLockedEmails(res.data.currently_locked ?? [])
        })
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [search, statusFilter])

  return (
    <div>
      <h1 className="font-display text-2xl">Login Activity</h1>
      <p className="mt-2 text-sm text-stone">
        Every login attempt across the site, successful or not. Accounts lock out after 5 failed
        attempts within 15 minutes.
      </p>

      {lockedEmails.length > 0 && (
        <div className="mt-6 border border-rani/40 bg-rani/5 p-4">
          <p className="text-sm font-medium text-rani">Currently locked out:</p>
          <p className="mt-1 text-sm text-stone">{lockedEmails.join(', ')}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-stone-light/60 bg-transparent px-3.5 py-2.5 text-sm focus:border-emerald focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-stone-light/60 bg-transparent px-3 py-2.5 text-sm focus:border-emerald focus:outline-none"
        >
          <option value="">All attempts</option>
          <option value="success">Successful only</option>
          <option value="failed">Failed only</option>
        </select>
      </div>

      <div className="mt-6 overflow-x-auto bg-ivory dark:bg-ink-soft">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-light/40 text-xs uppercase tracking-wide text-stone">
              <th className="p-4">Email</th>
              <th className="p-4">IP Address</th>
              <th className="p-4">Result</th>
              <th className="p-4">Browser</th>
              <th className="p-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-light/40">
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-stone">Loading…</td></tr>
            ) : attempts.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-stone">No login attempts found.</td></tr>
            ) : (
              attempts.map((attempt) => (
                <tr key={attempt.id}>
                  <td className="p-4">{attempt.email}</td>
                  <td className="p-4 text-stone">{attempt.ip_address}</td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold uppercase ${attempt.successful ? 'text-emerald' : 'text-rani'}`}>
                      {attempt.successful ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="max-w-[200px] truncate p-4 text-xs text-stone" title={attempt.user_agent}>
                    {attempt.user_agent || '—'}
                  </td>
                  <td className="p-4 text-xs text-stone">
                    {new Date(attempt.created_at).toLocaleString('en-PK', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}