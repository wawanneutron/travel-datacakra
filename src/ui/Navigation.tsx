import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getToken, getUser } from '../features/auth/authSlice'

function Navigation() {
  const isLogin = useSelector(getToken)
  const user = useSelector(getUser)

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

        <li>
          <Link
            to="/travel-list"
            className={
              location.pathname === '/travel-list'
                ? 'text-accent-400 transition-colors'
                : 'text-primary-100'
            }
          >
            Article
          </Link>
        </li>

        {/* valiadation menu */}
        {!hideOnDashboard && (
          <>
            {!isLogin && (
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
            )}
          </>
        )}

        {isLogin && (
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-4 capitalize"
            >
              <span
                className={
                  !hideOnDashboard ? 'text-primary-100' : 'text-accent-400'
                }
              >
                {user?.username}
              </span>
              <img
                src="https://i.pravatar.cc/300"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
