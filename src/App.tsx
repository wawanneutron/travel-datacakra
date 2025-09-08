import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Travel from './pages/Travel'
import DashboardArticle from './pages/dashboard/Article'
import DashboardCategory from './pages/dashboard/Category'
import DashboardHome from './pages/dashboard/Home'
import AppLayout from './ui/AppLayout'
import AppLayoutDashboard from './ui/AppLayoutDashboard'
import ProtectedRoute from './features/auth/ProtectedRoute'
import Detail from './pages/Detail'
import DashboardComment from './pages/dashboard/Comment'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //note: set 5 menit auto fetch
      staleTime: 1000 * 60 * 5
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="travel-list" element={<Travel />} />
            <Route path="travel-list/:detailId" element={<Detail />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <AppLayoutDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="dashboard/article" element={<DashboardArticle />} />
            <Route path="dashboard/category" element={<DashboardCategory />} />
            <Route path="dashboard/comment" element={<DashboardComment />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 5000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#fff',
            color: '#2C3D4F'
          }
        }}
      />
    </QueryClientProvider>
  )
}

export default App
