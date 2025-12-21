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
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { userService } from "@/services/user"
import type { ModelsUser } from "@/apis/data-contracts"
import { useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"

type MembersSelectProps = {
    value: string[]
    onChange: (value: string[]) => void
    label?: string
    placeholder?: string
    className?: string
}

export function MembersSelect({
    value,
    onChange,
    label = "Membros do projeto",
    placeholder = "Adicionar membro...",
    className,
}: MembersSelectProps) {
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const { data: usersResponse, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () => userService.list({ page_size: 100 }),
        enabled: true,
    })

    const users: ModelsUser[] = Array.isArray(usersResponse)
        ? usersResponse
        : (usersResponse?.data || [])

    const filtered = users.filter(
        (user) =>
            user.name?.toLowerCase().includes(inputValue.toLowerCase()) &&
            user.id &&
            !value.includes(user.id)
    )

    const userIdToName = React.useMemo(() => {
        const map = new Map<string, string>()
        users.forEach((user) => {
            if (user.id && user.name) {
                map.set(user.id, user.name)
            }
        })
        return map
    }, [users])

    const handleSelect = (userId: string) => {
        if (!value.includes(userId)) {
            onChange([...value, userId])
        }
        setInputValue("")
        requestAnimationFrame(() => inputRef.current?.focus())
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            const match = filtered.find(
                (user) => user.name?.toLowerCase() === inputValue.trim().toLowerCase()
            )
            if (match?.id && !value.includes(match.id)) {
                handleSelect(match.id)
            }
        } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
            onChange(value.slice(0, -1))
        }
    }

    const removeMember = (userId: string) =>
        onChange(value.filter((id) => id !== userId))

    return (
        <FormItem className={cn("flex flex-col w-full gap-4 mt-4", className)}>
            <div className="flex items-center gap-3">
                <FormLabel>{label}</FormLabel>
                <FormMessage />
            </div>

            <FormControl>
                <div
                    className={cn(
                        "flex flex-wrap items-center gap-2 rounded-md border-3 p-2 min-h-[56px]",
                        "cursor-text"
                    )}
                    onClick={() => inputRef.current?.focus()}
                >
                    {value.map((userId) => (
                        <Badge
                            key={userId}
                            variant="outline"
                            className="flex items-center gap-1 cursor-default"
                        >
                            {userIdToName.get(userId) || userId}
                            <div onClick={() => removeMember(userId)} className="cursor-pointer">
                                <X className="h-3 w-3" />
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
                            {isLoading ? (
                                <CommandEmpty className="px-4 py-3">Carregando...</CommandEmpty>
                            ) : filtered.length > 0 ? (
                                <>
                                    <CommandGroup>
                                        {filtered.map((user) => (
                                            user.id && (
                                                <CommandItem
                                                    key={user.id}
                                                    onSelect={() => handleSelect(user.id!)}
                                                    className={cn(
                                                        "px-4 py-3 cursor-pointer",
                                                        "hover:bg-[var(--primary)] transition-colors duration-150",
                                                        "flex items-center"
                                                    )}
                                                    role="button"
                                                    tabIndex={0}
                                                >
                                                    {user.name || user.email || user.id}
                                                </CommandItem>
                                            )
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
        </FormItem>
    )
}
