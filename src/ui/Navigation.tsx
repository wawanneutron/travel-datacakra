import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()
  const hideOnDashboard = location.pathname.startsWith('/dashboard')

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            to="/"
            className={
              location.pathname === '/'
                ? 'text-accent-400 transition-colors'
                : 'text-primary-100'
            }
          >
            Home
          </Link>
        </li>

        {/* valiadation menu */}
        {!hideOnDashboard && (
          <>
            <li>
              <Link
                to="/travel-list"
                className={
                  location.pathname === '/travel-list'
                    ? 'text-accent-400 transition-colors'
                    : 'text-primary-100'
                }
              >
                Find Trip
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={
                  location.pathname === '/login'
                    ? 'text-accent-400 transition-colors'
                    : 'text-primary-100'
                }
              >
                Sign In
              </Link>
            </li>
          </>
        )}

        <li>
          <Link to="/dashboard" className="flex items-center gap-2">
            <span
              className={
                !hideOnDashboard ? 'text-primary-100' : 'text-accent-400'
              }
            >
              neutron123
            </span>
            <img
              src="https://i.pravatar.cc/300"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
