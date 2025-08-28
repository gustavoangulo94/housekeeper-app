import * as React from "react"

export type UserRole = 'TENANT' | 'OWNER' | 'MEDIATOR' | 'CLEANER'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  tenantId?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  simulateRole: (role: UserRole) => void
  logout: () => void
}

const UserContext = React.createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    // Check localStorage for persisted user
    const stored = localStorage.getItem('aircasa-user')
    return stored ? JSON.parse(stored) : null
  })

  // Persist user to localStorage
  React.useEffect(() => {
    if (user) {
      localStorage.setItem('aircasa-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('aircasa-user')
    }
  }, [user])

  const simulateRole = React.useCallback((role: UserRole) => {
    if (user) {
      setUser({ ...user, role })
    }
  }, [user])

  const logout = React.useCallback(() => {
    setUser(null)
    localStorage.removeItem('aircasa-user')
  }, [])

  const value = React.useMemo(() => ({
    user,
    setUser,
    simulateRole,
    logout,
  }), [user, simulateRole, logout])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// Utility function to simulate login based on email
export function simulateLoginFromEmail(email: string): User {
  const emailLower = email.toLowerCase()
  
  let role: UserRole = 'TENANT'
  if (emailLower.includes('owner')) role = 'OWNER'
  else if (emailLower.includes('mediator')) role = 'MEDIATOR'
  else if (emailLower.includes('cleaner')) role = 'CLEANER'
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: email.split('@')[0].replace(/[^a-zA-Z ]/g, ' ').trim(),
    email,
    role,
    tenantId: role === 'TENANT' ? 'tenant-1' : undefined,
  }
}
