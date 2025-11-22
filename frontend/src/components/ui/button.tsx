import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 text-sm font-semibold tracking-tight ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg hover:-translate-y-0.5 hover:shadow-xl",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white border-transparent",
        destructive:
          "bg-destructive/90 text-destructive-foreground border-destructive/40 hover:bg-destructive",
        outline:
          "border-primary/40 bg-background/80 text-primary shadow-[0_10px_25px_rgba(16,24,40,0.08)] hover:bg-primary/5",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary/50 hover:bg-secondary/90",
        ghost:
          "border-border bg-transparent text-foreground hover:bg-foreground/5",
        link:
          "border-transparent text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-10 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
