import App from './App.tsx'
import store from './store/index.ts'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import LoadAuth from './features/auth/LoadAuth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <LoadAuth />
      <App />
    </Provider>
  </StrictMode>
)
