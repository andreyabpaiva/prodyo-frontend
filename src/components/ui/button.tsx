import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: `${baseStyles} bg-[var(--dark)] text-[var(--primary)] hover:bg-[var(--text)]/90 shadow-lg cursor-pointer`,
      destructive: `${baseStyles} bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60`,
      outline: `${baseStyles} border-2 rounded-3xl bg-[var(--primary)] shadow-xs cursor-pointer hover:bg-[var(--background)] hover:shadow-md`,
      secondary: `${baseStyles} bg-[var(--background)] text-[var(--dark)] border-[3px] border-[var(--dark)] hover:bg-[var(--primary)]/90 shadow-lg cursor-pointer`,
      ghost:
        "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 disabled:pointer-events-none",
      link: `${baseStyles} underline-offset-4 underline cursor-pointer text-[var(--dark)] font-bold`,
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size: variant === "ghost" ? null : size,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
