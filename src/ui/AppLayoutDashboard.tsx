import { Outlet } from 'react-router-dom'
import Header from './Header'
import SideNavigation from './SideNavigation'

function AppLayoutDashboard() {
  return (
    <aside className="grid grid-cols-[16rem_1fr] h-full bg-primary-950 text-primary-100">
      <SideNavigation />
      <main className="h-screen overflow-auto">
        <div className="px-4 py-2">
          <Header />
        </div>
        <Outlet />
      </main>
    </aside>
  )
}

export default AppLayoutDashboard
