"use client";

import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { FormItemContext } from "../contexts";

export function FormItem({ className, ...props }: ComponentProps<"div">) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("grid", className)} {...props} />
    </FormItemContext.Provider>
  );
}
