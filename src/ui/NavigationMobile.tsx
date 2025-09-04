import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { getToken, getUser } from '../features/auth/authSlice'

function NavigationMobile() {
  const isLogin = useSelector(getToken)
  const user = useSelector(getUser)
  const location = useLocation()
  const hideOnDashboard = location.pathname.startsWith('/dashboard')

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const linkClass = (path: string) =>
    location.pathname === path
      ? 'text-accent-400 transition-colors'
      : 'text-primary-100'

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-primary-100 focus:outline-none z-50 relative"
      >
        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-primary-900/60 backdrop-blur-md"
            onClick={toggleMenu}
          />

          <div className="relative flex h-full w-full justify-center items-center">
            <ul className="flex flex-col items-center gap-16 text-xl">
              <li>
                <Link to="/" className={linkClass('/')} onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/travel-list"
                  className={linkClass('/travel-list')}
                  onClick={toggleMenu}
                >
                  Article
                </Link>
              </li>
              {!hideOnDashboard && !isLogin && (
                <li>
                  <Link
                    to="/login"
                    className={linkClass('/login')}
                    onClick={toggleMenu}
                  >
                    Sign In
                  </Link>
                </li>
              )}
              {isLogin && (
                <li>
                  <Link
                    to="/dashboard"
                    onClick={toggleMenu}
                    className="flex items-center gap-4 capitalize"
                  >
                    <span
                      className={
                        !hideOnDashboard
                          ? 'text-primary-100'
                          : 'text-accent-400'
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
          </div>
        </div>
      )}
    </div>
  )
}

export default NavigationMobile
