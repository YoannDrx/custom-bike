import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[color:var(--vice-cyan)] focus:outline-none focus:ring-2 focus:ring-[color:var(--vice-cyan)]/30 transition disabled:opacity-50 disabled:cursor-not-allowed resize-y",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
