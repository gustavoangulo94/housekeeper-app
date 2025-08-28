import * as React from "react"
import { cn } from "@/lib/utils"

const AcCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-ac border border-ac-border bg-ac-bg p-6 shadow-ac text-ac-fg",
      className
    )}
    {...props}
  />
))
AcCard.displayName = "AcCard"

const AcCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-6", className)}
    {...props}
  />
))
AcCardHeader.displayName = "AcCardHeader"

const AcCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight text-ac-fg",
      className
    )}
    {...props}
  />
))
AcCardTitle.displayName = "AcCardTitle"

const AcCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-ac-muted", className)}
    {...props}
  />
))
AcCardDescription.displayName = "AcCardDescription"

const AcCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
AcCardContent.displayName = "AcCardContent"

const AcCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-6", className)}
    {...props}
  />
))
AcCardFooter.displayName = "AcCardFooter"

export { AcCard, AcCardHeader, AcCardFooter, AcCardTitle, AcCardDescription, AcCardContent }
