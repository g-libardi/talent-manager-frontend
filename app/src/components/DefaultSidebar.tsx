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
import { LightbulbIcon, UserIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback } from "./ui/avatar"
import useAuth from "@/hooks/useAuth"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"


const menuItems = [
  //{
  //  title: 'Home',
  //  icon: HomeIcon,
  //  to: '/',
  //},
  {
    title: 'Candidates',
    icon: LightbulbIcon,
    to: '/',
  },
]


export function DefaultSidebar() {
  const userInfo = useAuth().getUserInfo()
  const auth = useAuth()
  const navigate = useNavigate()
  return (
    <Sidebar>

      <SidebarHeader className="pb-0 pl-0">
        <Menubar className="bg-transparent border-0">
          <MenubarMenu>
            <MenubarTrigger asChild className="w-full rounded-xl hover:bg-secondary">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className=" shadow-[inset_0_0px_10px_rgba(0,0,0,0.4)]">
                    <span className="font-bold">
                      <UserIcon/>
                    </span>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>{userInfo?.username}</p>
                </div>
              </div>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={async() => auth.logout().then(() => navigate('/login'))}>
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Talent Manager</SidebarGroupLabel>
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
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
