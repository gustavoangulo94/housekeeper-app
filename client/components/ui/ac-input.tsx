import * as React from "react"
import { cn } from "@/lib/utils"

export interface AcInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helpText?: string
  error?: string
}

const AcInput = React.forwardRef<HTMLInputElement, AcInputProps>(
  ({ className, type, label, helpText, error, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-ac-fg mb-2"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "flex h-12 w-full rounded-ac border border-ac-border bg-ac-bg px-4 py-3 text-sm text-ac-fg placeholder:text-ac-muted",
            "focus:outline-none focus:ring-2 focus:ring-ac-accent focus:border-ac-accent",
            "disabled:cursor-not-allowed disabled:opacity-50",
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
AcInput.displayName = "AcInput"

export { AcInput }
