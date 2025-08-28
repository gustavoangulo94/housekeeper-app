import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface AcCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helpText?: string
  error?: string
}

const AcCheckbox = React.forwardRef<HTMLInputElement, AcCheckboxProps>(
  ({ className, label, helpText, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className="w-full">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <input
              type="checkbox"
              id={checkboxId}
              className={cn(
                "peer h-5 w-5 shrink-0 rounded border-2 border-ac-border bg-ac-bg",
                "focus:outline-none focus:ring-2 focus:ring-ac-accent focus:ring-offset-2",
                "checked:bg-ac-accent checked:border-ac-accent",
                "disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-destructive focus:ring-destructive",
                "appearance-none cursor-pointer",
                className
              )}
              ref={ref}
              {...props}
            />
            <Check className="absolute top-0.5 left-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
          </div>
          {label && (
            <div className="flex-1">
              <label
                htmlFor={checkboxId}
                className="text-sm font-medium text-ac-fg cursor-pointer"
              >
                {label}
                {props.required && <span className="text-destructive ml-1">*</span>}
              </label>
              {helpText && !error && (
                <p className="mt-1 text-sm text-ac-muted">
                  {helpText}
                </p>
              )}
              {error && (
                <p className="mt-1 text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
AcCheckbox.displayName = "AcCheckbox"

export { AcCheckbox }
