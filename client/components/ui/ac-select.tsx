import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface AcSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helpText?: string
  error?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

const AcSelect = React.forwardRef<HTMLSelectElement, AcSelectProps>(
  ({ className, label, helpText, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-semibold text-ac-fg mb-2"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              "flex h-12 w-full rounded-ac border border-ac-border bg-ac-bg px-4 py-3 pr-8 text-sm text-ac-fg",
              "focus:outline-none focus:ring-2 focus:ring-ac-accent focus:border-ac-accent",
              "disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
              error && "border-destructive focus:ring-destructive focus:border-destructive",
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ac-muted pointer-events-none" />
        </div>
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
AcSelect.displayName = "AcSelect"

export { AcSelect }
