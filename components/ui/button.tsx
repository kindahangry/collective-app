import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-vt text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "pixel-button text-white hover:brightness-110",
        secondary: "bg-pixel-blue text-white border-3 border-pixel-dark hover:brightness-110",
        outline: "border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50",
        ghost: "bg-transparent text-white hover:bg-white/10",
        danger: "bg-red-600 text-white border-3 border-pixel-dark hover:brightness-110",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-base",
        lg: "h-14 px-8 text-xl",
        icon: "h-10 w-10",
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
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="animate-pulse">...</span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
