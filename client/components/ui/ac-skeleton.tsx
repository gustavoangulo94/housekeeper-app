import { cn } from "@/lib/utils"

function AcSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-ac bg-ac-bg-alt", className)}
      {...props}
    />
  )
}

export { AcSkeleton }
