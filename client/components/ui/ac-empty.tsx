import * as React from "react"
import { cn } from "@/lib/utils"
import { Inbox } from "lucide-react"

export interface AcEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
}

const AcEmpty = React.forwardRef<HTMLDivElement, AcEmptyProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-12 px-4 text-center",
          className
        )}
        {...props}
      >
        <div className="mb-4 text-ac-muted">
          {icon || <Inbox className="h-12 w-12" />}
        </div>
        {title && (
          <h3 className="text-lg font-semibold text-ac-fg mb-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-ac-muted mb-6 max-w-sm">
            {description}
          </p>
        )}
        {action && action}
      </div>
    )
  }
)
AcEmpty.displayName = "AcEmpty"

export { AcEmpty }
