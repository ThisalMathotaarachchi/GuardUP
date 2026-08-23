import { Outlet } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12">
      <div className="mb-8 flex items-center gap-2">
        <Shield className="size-8 text-accent" aria-hidden="true" />
        <span className="text-xl font-semibold text-primary">GuardUp</span>
      </div>

      <div className="w-full max-w-md rounded-xl border border-primary/10 bg-white p-8 shadow-sm">
        <Outlet />
      </div>
    </div>
  )
}
