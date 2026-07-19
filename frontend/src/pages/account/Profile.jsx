import { useAuthStore } from '../../store/useAuthStore.js'

export default function Profile() {
  const user = useAuthStore((s) => s.user)

  return (
    <div>
      <h2 className="font-display text-2xl">Profile</h2>
      <div className="mt-6 max-w-md space-y-4 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-stone">Full Name</p>
          <p className="mt-1">{user?.name}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-stone">Email</p>
          <p className="mt-1">{user?.email}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-stone">Phone</p>
          <p className="mt-1">{user?.phone || '—'}</p>
        </div>
      </div>
      {/* TODO: make these fields editable once a PUT /api/me endpoint exists */}
      <p className="mt-8 text-xs text-stone">
        Editing profile details will be available once the update-profile API is connected.
      </p>
    </div>
  )
}