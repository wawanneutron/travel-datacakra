import { FaCaretSquareRight, FaHome, FaSignOutAlt } from 'react-icons/fa'
import { FaHeartCircleCheck } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import Logo from './Logo'
import toast from 'react-hot-toast'

function SideNavigation() {
  const navLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <FaHome className="h-5 w-5 text-primary-600" />
    },
    {
      name: 'Article',
      href: '/dashboard/article',
      icon: <FaHeartCircleCheck className="h-5 w-5 text-primary-600" />
    },
    {
      name: 'Category',
      href: '/dashboard/category',
      icon: <FaCaretSquareRight className="h-5 w-5 text-primary-600" />
    }
  ]

  const dispatch = useDispatch()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logout successful')
  }

  return (
    <nav className="border-r border-primary-900">
      <div className="my-8 px-4">
        <Logo />
      </div>
      <ul className="flex flex-col gap-2 text-lg">
        {navLinks.map((link) => (
          <li>
            <Link
              to={link.href}
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                location.pathname === link.href ? 'bg-primary-900' : ''
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <button
            onClick={handleLogout}
            className="py-3 px-5 w-full hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200"
          >
            <FaSignOutAlt className="h-5 w-5 text-primary-600" />
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default SideNavigation
