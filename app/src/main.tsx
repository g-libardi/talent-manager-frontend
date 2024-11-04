import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from '@/plugins/fileBasedRoutes'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {routes.map(({ route, component: Component, layout: Layout }) => (
          <Route element={<Layout />} key={route}>
            <Route path={route} element={<Component/>} key={route} />
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
)
