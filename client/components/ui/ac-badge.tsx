import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const acBadgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Task status badges
        pending: "bg-gray-100 text-gray-800 border border-gray-200",
        assigned: "bg-blue-100 text-blue-800 border border-blue-200",
        in_progress: "bg-amber-100 text-amber-800 border border-amber-200",
        submitted: "bg-purple-100 text-purple-800 border border-purple-200",
        approved: "bg-green-100 text-green-800 border border-green-200",
        rejected: "bg-red-100 text-red-800 border border-red-200",
        
        // General purpose badges
        default: "bg-ac-bg-alt text-ac-fg border border-ac-border",
        primary: "bg-ac-accent text-white",
        secondary: "bg-ac-bg text-ac-fg border border-ac-border",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-ac-border text-ac-fg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AcBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof acBadgeVariants> {}

function AcBadge({ className, variant, ...props }: AcBadgeProps) {
  return (
    <div className={cn(acBadgeVariants({ variant }), className)} {...props} />
  )
}

export { AcBadge, acBadgeVariants }
