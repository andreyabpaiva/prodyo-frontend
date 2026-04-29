"use client";

import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useFormField } from "@/hooks/use-form-fields";

export function FormDescription({ className, ...props }: ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
