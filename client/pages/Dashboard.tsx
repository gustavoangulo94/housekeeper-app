import * as React from "react"
import { Link } from "react-router-dom"
import { AcCard, AcCardContent, AcCardHeader, AcCardTitle } from "@/components/ui/ac-card"
import { AcButton } from "@/components/ui/ac-button"
import { AcSkeleton } from "@/components/ui/ac-skeleton"
import { AcEmpty } from "@/components/ui/ac-empty"
import { useUser } from "@/hooks/use-user"
import { getTodaysTasks, getOpenIncidents, Task, Incident } from "@/lib/data"
import { CheckSquare, AlertTriangle, Calendar, Plus, UserCheck, Star } from "lucide-react"

const Dashboard: React.FC = () => {
  const { user } = useUser()
  const [isLoading, setIsLoading] = React.useState(true)
  const [todaysTasks, setTodaysTasks] = React.useState<Task[]>([])
  const [openIncidents, setOpenIncidents] = React.useState<Incident[]>([])

  React.useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setTodaysTasks(getTodaysTasks())
      setOpenIncidents(getOpenIncidents())
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  const getQuickActions = () => {
    if (!user) return []
    
    const baseActions = [
      { to: "/tasks", label: "View Tasks", icon: CheckSquare, roles: ['CLEANER', 'MEDIATOR', 'OWNER'] }
    ]
    
    const roleSpecificActions = (() => {
      switch (user.role) {
        case 'MEDIATOR':
          return [
            { to: "/mediator/assign", label: "Assign Cleaner", icon: UserCheck, roles: ['MEDIATOR'] },
            { to: "/owner/review", label: "Reviews", icon: Star, roles: ['MEDIATOR'] }
          ]
        case 'OWNER':
          return [
            { to: "/owner/review", label: "Reviews", icon: Star, roles: ['OWNER'] }
          ]
        case 'TENANT':
          return [
            { to: "/tenant/inventory", label: "Check Inventory", icon: CheckSquare, roles: ['TENANT'] }
          ]
        case 'CLEANER':
          return []
        default:
          return []
      }
    })()
    
    return [...baseActions, ...roleSpecificActions].filter(action => 
      action.roles.includes(user.role)
    )
  }

  const quickActions = getQuickActions()

  if (!user) {
    return (
      <div className="min-h-screen bg-ac-bg flex items-center justify-center">
        <AcCard className="max-w-md">
          <AcCardContent className="text-center py-8">
            <p className="text-ac-muted mb-4">Please sign in to access your dashboard</p>
            <Link to="/login">
              <AcButton>Sign In</AcButton>
            </Link>
          </AcCardContent>
        </AcCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ac-bg">
      {/* Header */}
      <div className="ac-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ac-fg mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-ac-muted">
            Here's what's happening with your properties today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Tasks for Today */}
          <AcCard>
            <AcCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <AcCardTitle className="text-sm font-medium">
                Tasks for Today
              </AcCardTitle>
              <CheckSquare className="h-4 w-4 text-ac-muted" />
            </AcCardHeader>
            <AcCardContent>
              {isLoading ? (
                <AcSkeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-ac-fg">
                  {todaysTasks.length}
                </div>
              )}
              <p className="text-xs text-ac-muted">
                {todaysTasks.length === 1 ? 'task' : 'tasks'} due today
              </p>
            </AcCardContent>
          </AcCard>

          {/* Upcoming Checkouts */}
          <AcCard>
            <AcCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <AcCardTitle className="text-sm font-medium">
                Upcoming Checkouts
              </AcCardTitle>
              <Calendar className="h-4 w-4 text-ac-muted" />
            </AcCardHeader>
            <AcCardContent>
              {isLoading ? (
                <AcSkeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-ac-fg">3</div>
              )}
              <p className="text-xs text-ac-muted">
                properties this week
              </p>
            </AcCardContent>
          </AcCard>

          {/* Open Incidents */}
          <AcCard>
            <AcCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <AcCardTitle className="text-sm font-medium">
                Open Incidents
              </AcCardTitle>
              <AlertTriangle className="h-4 w-4 text-ac-muted" />
            </AcCardHeader>
            <AcCardContent>
              {isLoading ? (
                <AcSkeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-ac-fg">
                  {openIncidents.length}
                </div>
              )}
              <p className="text-xs text-ac-muted">
                requiring attention
              </p>
            </AcCardContent>
          </AcCard>
        </div>

        {/* Quick Actions */}
        {quickActions.length > 0 && (
          <AcCard>
            <AcCardHeader>
              <AcCardTitle>Quick Actions</AcCardTitle>
            </AcCardHeader>
            <AcCardContent>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <AcSkeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <Link key={action.to} to={action.to}>
                        <AcButton variant="outline" className="w-full justify-start">
                          <Icon className="mr-2 h-4 w-4" />
                          {action.label}
                        </AcButton>
                      </Link>
                    )
                  })}
                </div>
              )}
            </AcCardContent>
          </AcCard>
        )}

        {/* Recent Activity (placeholder) */}
        <AcCard className="mt-6">
          <AcCardHeader>
            <AcCardTitle>Recent Activity</AcCardTitle>
          </AcCardHeader>
          <AcCardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-3">
                    <AcSkeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <AcSkeleton className="h-4 w-3/4" />
                      <AcSkeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <AcEmpty
                title="No recent activity"
                description="Activity from your properties will appear here"
              />
            )}
          </AcCardContent>
        </AcCard>
      </div>
    </div>
  )
}

export default Dashboard
