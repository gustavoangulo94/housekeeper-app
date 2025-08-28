import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Home, CheckSquare, Star, User } from "lucide-react"

export interface AcBottomNavProps {
  currentUser?: {
    name: string
    role: 'TENANT' | 'OWNER' | 'MEDIATOR' | 'CLEANER'
  } | null
}

const AcBottomNav: React.FC<AcBottomNavProps> = ({ currentUser }) => {
  const location = useLocation()
  
  const getNavigationItems = () => {
    if (!currentUser) return []
    
    const role = currentUser.role
    
    // Base items that are always shown
    const baseItems = [
      {
        to: "/",
        label: "Dashboard",
        icon: Home,
        roles: ['TENANT', 'OWNER', 'MEDIATOR', 'CLEANER']
      },
      {
        to: "/profile",
        label: "Profile", 
        icon: User,
        roles: ['TENANT', 'OWNER', 'MEDIATOR', 'CLEANER']
      }
    ]
    
    // Role-specific middle items
    const roleSpecificItems = (() => {
      switch (role) {
        case 'TENANT':
          return [
            { to: "/tenant/inventory", label: "Inventory", icon: CheckSquare },
            { to: "/reviews", label: "Reviews", icon: Star }
          ]
        case 'OWNER':
          return [
            { to: "/owner/review", label: "Reviews", icon: Star },
            { to: "/tasks", label: "Tasks", icon: CheckSquare }
          ]
        case 'MEDIATOR':
          return [
            { to: "/tasks", label: "Tasks", icon: CheckSquare },
            { to: "/mediator/assign", label: "Assign", icon: Star }
          ]
        case 'CLEANER':
          return [
            { to: "/tasks", label: "Tasks", icon: CheckSquare },
            { to: "/reviews", label: "Reviews", icon: Star }
          ]
        default:
          return [
            { to: "/tasks", label: "Tasks", icon: CheckSquare },
            { to: "/reviews", label: "Reviews", icon: Star }
          ]
      }
    })()
    
    // Combine items: Dashboard, RoleSpecific1, RoleSpecific2, Profile
    return [
      baseItems[0], // Dashboard
      ...roleSpecificItems,
      baseItems[1] // Profile
    ]
  }
  
  const navigationItems = getNavigationItems()
  
  // Only show if user is logged in
  if (!currentUser) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ac-bg border-t border-ac-border md:hidden">
      <nav className="flex items-center justify-around px-2 py-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.to
          const Icon = item.icon
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 text-xs transition-colors",
                isActive 
                  ? "text-ac-accent" 
                  : "text-ac-muted hover:text-ac-fg"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive ? "text-ac-accent" : "text-ac-muted"
                )} 
              />
              <span className={cn(
                "font-medium truncate",
                isActive ? "text-ac-accent" : "text-ac-muted"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export { AcBottomNav }
