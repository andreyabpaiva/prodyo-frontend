"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/atoms/ui/label";
import { useFormField } from "@/hooks/use-form-fields";

export function FormLabel({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        "data-[error=true]:text-destructive font-bold text-disabled",
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
}
