import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-wide uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--vice-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--vice-pink)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_10px_30px_-10px_rgba(255,30,110,0.7)] hover:shadow-[0_0_24px_rgba(255,30,110,0.5),0_14px_40px_-10px_rgba(255,30,110,0.8)] hover:-translate-y-0.5",
        secondary:
          "bg-[color:var(--vice-cyan)] text-[color:var(--bg)] shadow-[0_10px_30px_-10px_rgba(0,212,255,0.7)] hover:shadow-[0_0_24px_rgba(0,212,255,0.5)] hover:-translate-y-0.5",
        ghost:
          "bg-transparent text-white border border-white/15 hover:bg-white/5 hover:border-white/30",
        outline:
          "bg-transparent text-white border border-[color:var(--vice-pink)]/60 hover:bg-[color:var(--vice-pink)]/10",
        danger:
          "bg-[color:var(--red)] text-white hover:bg-[color:var(--red-deep)]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
