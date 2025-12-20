"use client";

import { useState } from "react";
import { ChevronDown, UserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import { userService } from "@/services/user";

type UserSelectProps = {
    value?: string;
    onChange?: (userId: string) => void;
    className?: string;
};

export function UserSelect({ value, onChange, className = "" }: UserSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const projectId = useAppSelector((state) => state.project.projectId);

    const { data: usersData, isLoading } = useQuery({
        queryKey: ["users", "project", projectId],
        queryFn: () => {
            if (!projectId) {
                throw new Error("Project ID is required");
            }
            return userService.projectDetail({
                projectId,
                page: 1,
                page_size: 100,
            });
        },
        enabled: !!projectId,
    });

    const users = usersData?.data || usersData?.users || (Array.isArray(usersData) ? usersData : []);
    const selectedUser = users.find((user: any) => user.id === value);

    const handleSelect = (userId: string) => {
        onChange?.(userId);
        setIsOpen(false);
    };

    if (!projectId) {
        return (
            <button
                type="button"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold ${className}`}
                disabled
            >
                <UserRound size={16} />
                <span>Nenhum projeto selecionado</span>
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 py-2 text-sm font-semibold ${className}`}
                disabled={isLoading}
            >
                <UserRound size={16} />
                <span>{selectedUser?.name || (isLoading ? "Carregando..." : "Selecionar usuário")}</span>
                <ChevronDown size={16} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 z-20 w-48 rounded-[12px] border-[3px] border-[var(--dark)] bg-[var(--primary)] shadow-lg max-h-60 overflow-y-auto">
                        {isLoading ? (
                            <div className="px-4 py-2 text-sm text-[var(--disabled)]">
                                Carregando...
                            </div>
                        ) : users.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-[var(--disabled)]">
                                Nenhum usuário encontrado
                            </div>
                        ) : (
                            users.map((user: any) => (
                                <button
                                    key={user.id}
                                    type="button"
                                    onClick={() => handleSelect(user.id)}
                                    className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-[var(--background)] transition-colors ${
                                        value === user.id ? "bg-[var(--modal)]" : ""
                                    }`}
                                >
                                    {user.name}
                                </button>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

