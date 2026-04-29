"use client";

import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useFormField } from "@/hooks/use-form-fields";

export function FormMessage({ className, ...props }: ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn(
        "text-destructive text-xs text-error font-bold my-2",
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
}
