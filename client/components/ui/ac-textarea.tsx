import * as React from "react"
import { cn } from "@/lib/utils"

export interface AcTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helpText?: string
  error?: string
}

const AcTextarea = React.forwardRef<HTMLTextAreaElement, AcTextareaProps>(
  ({ className, label, helpText, error, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-semibold text-ac-fg mb-2"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[120px] w-full rounded-ac border border-ac-border bg-ac-bg px-4 py-3 text-sm text-ac-fg placeholder:text-ac-muted",
            "focus:outline-none focus:ring-2 focus:ring-ac-accent focus:border-ac-accent",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-vertical",
            error && "border-destructive focus:ring-destructive focus:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p className="mt-2 text-sm text-ac-muted">
            {helpText}
          </p>
        )}
      </div>
    )
  }
)
AcTextarea.displayName = "AcTextarea"

export { AcTextarea }
