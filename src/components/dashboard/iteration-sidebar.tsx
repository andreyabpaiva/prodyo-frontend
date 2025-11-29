"use client";

import Link from "next/link";
import { Iteration } from "@/types/domain";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Plus, UserRound } from "lucide-react";
import { useState } from "react";

type IterationSidebarProps = {
    iterations: Iteration[];
    activeIterationId?: string;
    projectId: string;
    onSelectIteration?: (iterationId: string) => void;
};

export function IterationSidebar({ iterations, activeIterationId, projectId, onSelectIteration }: IterationSidebarProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [isGraphsOpen, setIsGraphsOpen] = useState(false);

    return (
        <aside className="sticky top-3 min-h-screen w-50 min-w-50 border-r-[3px] border-[var(--dark)] bg-[var(--background)] px-4 py-8">
            <div className="flex h-full flex-col">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex items-center gap-2 text-md font-extrabold uppercase"
                    >
                        {isOpen ? (
                            <ChevronDown className="h-4 w-4 text-[var(--divider)]" />
                        ) : (
                            <ChevronRight className="h-4 w-4 text-[var(--divider)]" />
                        )}
                        <span>Iterações</span>
                    </button>
                    <button
                        className="rounded-full border-[2px] border-[var(--dark)] bg-[var(--background)] cursor-pointer"
                        aria-label="Adicionar iteração"
                    >
                        <Plus size={16} strokeWidth={3} />
                    </button>
                </div>

                <div
                    className={cn(
                        "relative pl-6 transition-[max-height,opacity] duration-300 ease-in-out",
                        isOpen ? "mt-2 max-h-[500px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
                    )}
                >
                    <span className="absolute left-[27px] top-4 bottom-2 w-[1px] bg-[var(--divider)]" aria-hidden />
                    <div className="flex flex-col gap-2">
                        {iterations.map((iteration) => {
                            const isActive = iteration.id === activeIterationId;
                            return (
                                <button
                                    key={iteration.id}
                                    onClick={() => onSelectIteration?.(iteration.id)}
                                    className="relative z-10 flex items-center gap-3 text-left"
                                >
                                    <span
                                        className={cn(
                                            "absolute left-[0.2px] h-2 w-2 rounded-full",
                                            isActive ? "bg-[var(--text)]" : "bg-[var(--divider)]"
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            "ml-5 text-base font-semibold cursor-pointer",
                                            isActive ? "text-[var(--text)]" : "text-[var(--disabled)]"
                                        )}
                                    >
                                        Iteração {iteration.number}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsGraphsOpen((prev) => !prev)}
                            className="flex items-center gap-2 text-md font-extrabold uppercase"
                        >
                            {isGraphsOpen ? (
                                <ChevronDown className="h-4 w-4 text-[var(--divider)]" />
                            ) : (
                                <ChevronRight className="h-4 w-4 text-[var(--divider)]" />
                            )}
                            <span>Gráficos</span>
                        </button>
                    </div>

                    <div
                        className={cn(
                            "relative pl-6 transition-[max-height,opacity] duration-300 ease-in-out",
                            isGraphsOpen ? "mt-2 max-h-[500px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
                        )}
                    >
                        <span className="absolute left-[27px] top-4 bottom-2 w-[1px] bg-[var(--divider)]" aria-hidden />
                        <div className="flex flex-col gap-2">
                            {iterations.map((iteration) => {
                                const isActive = iteration.id === activeIterationId;
                                return (
                                    <Link
                                        key={iteration.id}
                                        href={`/projects/${projectId}/indicators?iteration=${iteration.id}`}
                                        className="relative z-10 flex items-center gap-3 text-left"
                                    >
                                        <span
                                            className={cn(
                                                "absolute left-[0.2px] h-2 w-2 rounded-full",
                                                isActive ? "bg-[var(--text)]" : "bg-[var(--divider)]"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "ml-5 text-base font-semibold",
                                                isActive ? "" : "text-[var(--disabled)]"
                                            )}
                                        >
                                            Iteração {iteration.number}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex items-center gap-3 rounded-full border-[3px] border-[var(--dark)] bg-[var(--background)] px-4 py-2 text-sm font-semibold">
                    <div className="flex h-7 w-7 items-center justify-center gap-2 rounded-full border-[3px] border-[var(--dark)] bg-[var(--primary)]">
                        <UserRound />
                    </div>
                    <span className="text-sm font-semibold">Admin</span>
                </div>
            </div>
        </aside>
    );
}

