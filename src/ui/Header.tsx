import { useLocation } from 'react-router-dom'
import Logo from './Logo'
import Navigation from './Navigation'

function Header() {
  const location = useLocation()
  const hideOnDashboard = location.pathname.startsWith('/dashboard')

  return (
    <header className="z-10 border-b bg-primary-950 border-primary-900 text-primary-100 px-6 md:px-24 py-4">
      <div
        className={`flex items-center ${
          !hideOnDashboard ? 'justify-between' : 'justify-end'
        }`}
      >
        {!hideOnDashboard && <Logo />}
        <Navigation />
      </div>
    </header>
  )
}

export default Header
