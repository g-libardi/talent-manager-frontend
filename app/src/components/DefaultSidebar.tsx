import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HomeIcon, LightbulbIcon } from "lucide-react"
import { Link } from "react-router-dom"


const menuItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    to: '/',
  },
  {
    title: 'Candidates',
    icon: LightbulbIcon,
    to: '/candidates',
  },
]


export function DefaultSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
          <SidebarGroupLabel>Talent Manager</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
