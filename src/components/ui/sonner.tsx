"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand={true}
      richColors
      duration={4000}
      gap={8}
      offset={16}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "bg-[var(--primary)] text-[var(--text)]",
          title: "text-sm font-semibold",
          description: "text-xs text-[var(--disabled)]",
        },
      }}
      style={
        {
          "--normal-bg": "var(--primary)",
          "--normal-text": "var(--text)",
          "--normal-border": "var(--dark)]",
          "--success-bg": "var(--success)",
          "--success-text": "var(--primary)",
          "--success-border": "transparent",
          "--error-bg": "var(--error)",
          "--error-text": "var(--primary)",
          "--error-border": "transparent",
          "--warning-bg": "var(--warning)",
          "--warning-text": "var(--text)",
          "--warning-border": "transparent",
          "--info-bg": "var(--info)",
          "--info-text": "var(--primary)",
          "--info-border": "transparent",
          "--border-radius": "var(--radius-md)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
