import { DefaultSidebar } from '@/components/DefaultSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export default function Default() {
  return (
    <div className="w-dvw h-dvh">
      <SidebarProvider>
        <DefaultSidebar />
        <div className="flex flex-col w-full h-full">
          <header className="flex items-center">
            <SidebarTrigger />
            <h1 className="">Talent Manager</h1>
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
