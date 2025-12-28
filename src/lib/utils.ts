import { ProductivityLevel } from "@/types/domain";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const levelClasses: Record<ProductivityLevel, string> = {
  OK: "bg-[var(--ok)] text-[var(--dark)]",
  ALERT: "bg-[var(--alert)] text-[var(--dark)]",
  CRITICAL: "bg-[var(--critic)] text-[var(--primary)]",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
