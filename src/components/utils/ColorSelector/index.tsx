"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const colors = [
    { value: "red", color: "var(--critic)" },
    { value: "green", color: "var(--ok)" },
    { value: "blue", color: "var(--status-in-progress)" },
    { value: "gray", color: "var(--modal)" },
    { value: "yellow", color: "var(--yellow-soft)" },
]

export function ColorSelector({ value, onChange }: {
    value?: string
    onChange?: (value: string) => void
}) {
    return (
        <div className="flex flex-col gap-2">
            <RadioGroup
                value={value}
                onValueChange={onChange}
                className="flex gap-3"
            >
                {colors.map((c) => (
                    <label key={c.value}>
                        <RadioGroupItem
                            value={c.color}
                            className="peer sr-only"
                        />
                        <div
                            className={cn(
                                "w-8 h-8 rounded-md border-3 border-black cursor-pointer transition-all",
                                "peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-offset-2 peer-data-[state=checked]:ring-black"
                            )}
                            style={{ backgroundColor: c.color }}
                        />
                    </label>
                ))}
            </RadioGroup>
        </div>
    )
}
