import { DefaultSidebar } from '@/components/DefaultSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export default function Default() {
  return (
    <div className="w-dvw h-dvh">
      <SidebarProvider>
        <DefaultSidebar />
        <main>
          <header className="flex items-center">
          <SidebarTrigger />
          <h1 className="">Talent Manager</h1>
          </header>
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}
