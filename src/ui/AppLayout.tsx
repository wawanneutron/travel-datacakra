import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'

function AppLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
      <div>
        <Header />
        <main className={`flex-1 ${!isHome ? 'px-24' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
