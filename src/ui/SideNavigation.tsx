import { useState } from 'react'
import {
  FaComments,
  FaHome,
  FaNewspaper,
  FaSignOutAlt,
  FaThList
} from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import ModalLogout from '../features/auth/ModalLogout'
import Logo from './Logo'

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
      icon: <FaNewspaper className="h-5 w-5 text-primary-600" />
    },
    {
      name: 'Category',
      href: '/dashboard/category',
      icon: <FaThList className="h-5 w-5 text-primary-600" />
    },
    {
      name: 'Comments',
      href: '/dashboard/comment',
      icon: <FaComments className="h-5 w-5 text-primary-600" />
    }
  ]
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => setIsModalOpen(true)
  const toggleMenu = () => setIsOpen(!isOpen)

  const linkClass = (href: string) =>
    `py-3 px-5 flex items-center gap-4 font-semibold transition-colors ${
      location.pathname === href
        ? 'bg-primary-900 text-primary-100'
        : 'text-primary-200 hover:bg-primary-900 hover:text-primary-100'
    }`

  return (
    <>
      <nav className="hidden md:block border-r border-primary-900">
        <div className="my-8">
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

      {/* mobile version */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 text-primary-100 fixed top-4 left-4 z-50"
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-primary-950 shadow-lg transform transition-transform duration-300 z-40 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="my-8 px-4">
            <Logo />
          </div>
          <ul className="flex flex-col gap-2 text-lg">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={linkClass(link.href)}
                  onClick={toggleMenu}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li className="mt-auto">
              <button
                onClick={() => {
                  toggleMenu()
                  handleLogout()
                }}
                className={linkClass('#logout')}
              >
                <FaSignOutAlt className="h-5 w-5 text-primary-600" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ModalLogout
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default SideNavigation
