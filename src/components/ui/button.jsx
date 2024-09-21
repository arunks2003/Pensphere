import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-white",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white shadow hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-600/90 dark:bg-red-900 dark:text-white dark:hover:bg-red-900/90",
        outline:
          "border border-white bg-transparent text-white shadow-sm hover:bg-white hover:text-black dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-black dark:hover:text-white",
        secondary:
          "bg-black text-white shadow-sm hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80",
        ghost:
          "hover:bg-black/10 hover:text-black dark:hover:bg-white/10 dark:hover:text-white",
        link: "text-black underline-offset-4 hover:underline dark:text-white",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
