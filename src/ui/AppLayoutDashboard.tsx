import { Outlet } from 'react-router-dom'
import Header from './Header'
import SideNavigation from './SideNavigation'

function AppLayoutDashboard() {
  return (
    <div className="flex bg-primary-950 text-primary-100 min-h-screen">
      <div className="hidden md:block w-64 border-r border-primary-900">
        <SideNavigation />
      </div>

      <main className="flex-1 h-screen overflow-auto">
        <div className="px-4 py-2">
          <Header />
        </div>
        <div className="pb-12">
          <Outlet />
        </div>
      </main>

      <div className="md:hidden">
        <SideNavigation />
      </div>
    </div>
  )
}

export default AppLayoutDashboard
