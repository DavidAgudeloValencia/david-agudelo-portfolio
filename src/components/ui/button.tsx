import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-transparent text-[14px] font-normal uppercase tracking-[0.02em] whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.52,0.01,0,1)] outline-none select-none focus-visible:border-fog-blue focus-visible:ring-3 focus-visible:ring-fog-blue/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-ash-border aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-[5px] border-bone-white text-bone-white hover:border-fog-blue hover:text-fog-blue",
        outline:
          "rounded-[5px] border-ash-border text-bone-white hover:border-fog-blue hover:text-fog-blue",
        secondary:
          "rounded-[5px] border-bone-white/40 text-bone-white hover:border-fog-blue hover:text-fog-blue",
        ghost: "rounded-none text-bone-white hover:text-fog-blue",
        destructive:
          "rounded-[5px] border-ash-border text-bone-white hover:border-fog-blue hover:text-fog-blue",
        link: "text-bone-white underline-offset-4 hover:text-fog-blue",
      },
      size: {
        default: "h-9 gap-1.5 px-[15px] py-[9px]",
        xs: "h-6 gap-1 px-3 text-xs",
        sm: "h-7 gap-1 px-[13px] text-xs",
        lg: "h-10 gap-1.5 px-[15px] py-[9px]",
        icon: "size-9 rounded-[5px]",
        "icon-xs": "size-6 rounded-[5px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[5px]",
        "icon-lg": "size-10 rounded-[5px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }