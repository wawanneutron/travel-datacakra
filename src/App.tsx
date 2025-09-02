import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import Home from './pages/Home'
import AppLayout from './ui/AppLayout'
import Trip from './pages/Trip'

function App() {
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="travel-list" element={<Trip />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
