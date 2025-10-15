"use client"

import * as React from "react"
import { X } from "lucide-react"
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandEmpty,
    CommandSeparator,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

type MembersSelectProps = {
    value: string[]
    onChange: (value: string[]) => void
    label?: string
    placeholder?: string
    suggestions?: string[]
}

export function MembersSelect({
    value,
    onChange,
    label = "Membros do projeto",
    placeholder = "Adicionar membro...",
    suggestions = ["Andreya", "Carlos", "Beatriz", "João", "Marina", "Lucas"],
}: MembersSelectProps) {
    const [inputValue, setInputValue] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Filtra por conteúdo (mas o Enter só adiciona correspondência exata)
    const filtered = suggestions.filter(
        (m) =>
            m.toLowerCase().includes(inputValue.toLowerCase()) &&
            !value.includes(m)
    )

    const handleSelect = (member: string) => {
        if (!value.includes(member)) {
            onChange([...value, member])
        }
        setInputValue("")
        // mantém foco para seguir adicionando/removendo
        requestAnimationFrame(() => inputRef.current?.focus())
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            // só adiciona quando houver correspondência exata (case-insensitive)
            const match = suggestions.find(
                (m) => m.toLowerCase() === inputValue.trim().toLowerCase()
            )
            if (match && !value.includes(match)) {
                handleSelect(match)
            } else {
                // opcional: você pode mostrar feedback visual aqui se quiser
            }
        } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
            // remove último badge com Backspace se input vazio
            onChange(value.slice(0, -1))
        }
    }

    const removeMember = (member: string) =>
        onChange(value.filter((m) => m !== member))

    return (
        <FormItem className="flex flex-col w-full gap-4 mt-4">
            <FormLabel>{label}</FormLabel>

            <FormControl>
                <div
                    className={cn(
                        "flex flex-wrap items-center gap-2 rounded-md border-3 p-2 min-h-[56px]",
                        "cursor-text"
                    )}
                    onClick={() => inputRef.current?.focus()}
                >
                    {value.map((member) => (
                        <Badge
                            key={member}
                            variant="outline"
                            className="flex items-center gap-1 cursor-default"
                        >
                            {member}
                            <div onClick={() => removeMember(member)} className="cursor-pointer">
                                <X className="h-3 w-3"/>
                            </div>
                        </Badge>
                    ))}

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={value.length === 0 ? placeholder : ""}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKey}
                        onKeyPress={handleKey}
                        className="flex-1 border-none bg-transparent outline-none focus:ring-0 text-sm placeholder:text-muted-foreground min-w-[120px]"
                        aria-label={placeholder}
                    />
                </div>
            </FormControl>

            {inputValue !== "" && (
                <div
                    ref={el => {
                        if (el) {
                            el.style.transition = "transform 150ms, opacity 150ms";
                            el.style.transform = "scale(0.95)";
                            el.style.opacity = "0.95";
                            requestAnimationFrame(() => {
                                el.style.transform = "scale(1)";
                                el.style.opacity = "1";
                            });
                        }
                    }}
                    className={cn(
                        "rounded-md border-3 bg-popover overflow-hidden origin-top"
                    )}
                    style={{ willChange: "transform, opacity" }}
                >
                    <Command>
                        <CommandList>
                            {filtered.length > 0 ? (
                                <>
                                    <CommandGroup>
                                        {filtered.map((member) => (
                                            <CommandItem
                                                key={member}
                                                onSelect={() => handleSelect(member)}
                                                className={cn(
                                                    "px-4 py-3 cursor-pointer",
                                                    "hover:bg-[var(--primary)] transition-colors duration-150",
                                                    "flex items-center"
                                                )}
                                                role="button"
                                                tabIndex={0}
                                            >
                                                {member}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </>
                            ) : (
                                <CommandEmpty className="px-4 py-3">Nenhum membro encontrado</CommandEmpty>
                            )}
                        </CommandList>
                    </Command>
                </div>
            )}

            <FormMessage />
        </FormItem>
    )
}
