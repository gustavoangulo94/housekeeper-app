import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Menu, User, Settings } from "lucide-react"
import { AcButton } from "./ac-button"

export interface AcNavbarProps {
  currentUser?: {
    name: string
    role: 'TENANT' | 'OWNER' | 'MEDIATOR' | 'CLEANER'
  } | null
  onRoleChange?: (role: 'TENANT' | 'OWNER' | 'MEDIATOR' | 'CLEANER') => void
}

const AcNavbar: React.FC<AcNavbarProps> = ({ currentUser, onRoleChange }) => {
  const [showRoleSelector, setShowRoleSelector] = React.useState(false)
  
  const roles = [
    { value: 'TENANT' as const, label: 'Tenant' },
    { value: 'OWNER' as const, label: 'Owner' },
    { value: 'MEDIATOR' as const, label: 'Mediator' },
    { value: 'CLEANER' as const, label: 'Cleaner' },
  ]
  
  const getNavigationLinks = () => {
    if (!currentUser) return []
    
    const role = currentUser.role
    const links = [
      { to: "/", label: "Dashboard", roles: ['TENANT', 'OWNER', 'MEDIATOR', 'CLEANER'] },
      { to: "/tasks", label: "Tasks", roles: ['CLEANER', 'MEDIATOR'] },
      { to: "/tenant/inventory", label: "Inventory", roles: ['TENANT'] },
      { to: "/mediator/assign", label: "Assign", roles: ['MEDIATOR'] },
      { to: "/owner/review", label: "Reviews", roles: ['OWNER', 'MEDIATOR'] },
    ]
    
    return links.filter(link => link.roles.includes(role))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ac-border bg-ac-bg/95 backdrop-blur supports-[backdrop-filter]:bg-ac-bg/60">
      <div className="ac-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-ac-accent">Aircasa</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {getNavigationLinks().map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-ac-fg hover:text-ac-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Role Simulator (Development) */}
          {currentUser && onRoleChange && (
            <div className="relative hidden md:block">
              <AcButton
                variant="outline"
                size="sm"
                onClick={() => setShowRoleSelector(!showRoleSelector)}
              >
                {currentUser.role}
              </AcButton>
              {showRoleSelector && (
                <div className="absolute right-0 top-full mt-2 w-32 rounded-ac border border-ac-border bg-ac-bg shadow-ac z-10">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      onClick={() => {
                        onRoleChange(role.value)
                        setShowRoleSelector(false)
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-ac-bg-alt transition-colors",
                        currentUser.role === role.value && "bg-ac-bg-alt font-medium"
                      )}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="hidden md:block text-sm text-ac-fg">
                  {currentUser.name}
                </span>
                <AcButton variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </AcButton>
              </div>
            ) : (
              <Link to="/login">
                <AcButton size="sm">Sign In</AcButton>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <AcButton variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </AcButton>
        </div>
      </div>
    </header>
  )
}

export { AcNavbar }
