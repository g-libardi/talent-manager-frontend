import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from '@/plugins/fileBasedRoutes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {routes.map(({ route, component: Component = Fragment }) => (
          <Route path={route} element={<Component/>} key={route} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
