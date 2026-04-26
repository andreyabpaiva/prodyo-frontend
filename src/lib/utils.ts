import { ProductivityLevel } from "@/types/domain";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const levelClasses: Record<ProductivityLevel, string> = {
  OK: "bg-ok text-dark",
  ALERT: "bg-alert text-dark",
  CRITICAL: "bg-critic text-primary",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
