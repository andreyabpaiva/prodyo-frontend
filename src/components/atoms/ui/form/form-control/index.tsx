"use client";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps } from "react";
import { useFormField } from "@/hooks/use-form-fields";

export function FormControl({ ...props }: ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}
