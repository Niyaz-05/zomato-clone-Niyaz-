import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "start" | "center" | "end"
  className?: string
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ trigger, children, align = "start", className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref && 'current' in ref && ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])

    return (
      <div ref={ref} className={cn("relative inline-block", className)}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {trigger}
          <ChevronDown className="h-4 w-4" />
        </div>
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
              align === "center" && "left-1/2 -translate-x-1/2",
              align === "end" && "right-0",
              align === "start" && "left-0"
            )}
          >
            {children}
          </div>
        )}
      </div>
    )
  }
)
DropdownMenu.displayName = "DropdownMenu"
