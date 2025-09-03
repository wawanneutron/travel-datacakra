import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Travel from './pages/Travel'
import DashboardArticle from './pages/dashboard/Article'
import DashboardCategory from './pages/dashboard/Category'
import DashboardHome from './pages/dashboard/Home'
import AppLayout from './ui/AppLayout'
import AppLayoutDashboard from './ui/AppLayoutDashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="travel-list" element={<Travel />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>

          <Route element={<AppLayoutDashboard />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="dashboard/article" element={<DashboardArticle />} />
            <Route path="dashboard/category" element={<DashboardCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
