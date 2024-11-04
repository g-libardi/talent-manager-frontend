import { Outlet } from 'react-router-dom'

export default function Default() {
  return (
    <div className="w-dvw h-dvh">
      <h1>Talent Manager</h1>
      <Outlet />
    </div>
  )
}
