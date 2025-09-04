import { useSelector } from 'react-redux'
import { getUser } from '../../features/auth/authSlice'

export default function DashboardHome() {
  const user = useSelector(getUser)

  return (
    <div className="py-2">
      <div className="border-b border-primary-800 pb-2">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p>
          Welcome{' '}
          <span className="text-accent-500 capitalize">{user?.username}</span>{' '}
          to the dashboard! 👋
        </p>
      </div>
    </div>
  )
}
