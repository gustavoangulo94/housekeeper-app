import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const acButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-ac text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ac-accent text-white hover:bg-ac-accent/90 active:bg-ac-accent/80",
        secondary: "border border-ac-border bg-ac-bg hover:bg-ac-bg-alt text-ac-fg",
        outline: "border border-ac-accent text-ac-accent hover:bg-ac-accent hover:text-white",
        ghost: "hover:bg-ac-bg-alt text-ac-fg",
        link: "text-ac-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface AcButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof acButtonVariants> {
  asChild?: boolean
}

const AcButton = React.forwardRef<HTMLButtonElement, AcButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(acButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
AcButton.displayName = "AcButton"

export { AcButton, acButtonVariants }
