"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Plus, UserRound } from "lucide-react";
import { useState, useEffect } from "react";
import type { ModelsIteration } from "@/apis/data-contracts";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setActiveIterationsId, setActiveGraphsId, setIterationNumber } from "@/store/iterationSlice";
import { useRouter, usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type IterationSidebarProps = {
    iterations: ModelsIteration[];
    projectId: string;
};

export function IterationSidebar({ iterations, projectId }: IterationSidebarProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [isGraphsOpen, setIsGraphsOpen] = useState(false);
    const [activeState, setActiveState] = useState<{ section: 'iterations' | 'graphs'; id: string } | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const userName = useSelector((state: RootState) => state.auth.user?.name);

    // fix it later
    useEffect(() => {
        if (iterations.length > 0 && iterations[0].id && !activeState) {
            setActiveState({ section: 'iterations', id: iterations[0].id });
            dispatch(setActiveIterationsId(iterations[0].id));
        }
        
    }, [iterations, activeState, dispatch]);

    return (
        <aside className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-50 min-w-50 z-40 border-r-3 border-[--dark] bg-[--background] px-4 py-8 overflow-y-auto">
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
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={`/projects/${projectId}/create-iteration`}
                                className="rounded-full border-2 border-[--dark] bg-[--background] cursor-pointer"
                            >
                                <Plus size={16} strokeWidth={3} />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Criar iteração</p>
                        </TooltipContent>
                    </Tooltip>
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
                            if (!iteration.id) return null;
                            const isActive = activeState?.section === 'iterations' && activeState?.id === iteration.id;
                            return (
                                <Link
                                    href={`/projects/${projectId}/`}
                                    key={iteration.id}
                                    onClick={() => {
                                        if (iteration.id) {
                                            router.push(`/projects/${projectId}/`);
                                            setActiveState({ section: 'iterations', id: iteration.id });
                                            dispatch(setActiveIterationsId(iteration.id));
                                            dispatch(setActiveGraphsId(null));
                                        }
                                    }}
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
                                        Iteração {iteration.number || 0}
                                    </span>
                                </Link>
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
                                if (!iteration.id) return null;
                                const isActive = activeState?.section === 'graphs' && activeState?.id === iteration.id;
                                return (
                                    <Link
                                        key={iteration.id}
                                        href={`/projects/${projectId}/indicators?iteration=${iteration.id}`}
                                        onClick={() => {
                                            if (iteration.id) {
                                                router.push(`/projects/${projectId}/indicators?iteration=${iteration.id}`)
                                                dispatch(setActiveGraphsId(iteration.id));
                                                dispatch(setActiveIterationsId(null));
                                                dispatch(setIterationNumber(iteration.number || null));
                                                setActiveState({ section: 'graphs', id: iteration.id });
                                            }
                                        }}
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
                                            Iteração {iteration.number || 0}
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
                    <span className="text-sm font-semibold">{userName ?? "Admin"}</span>
                </div>
            </div>
        </aside>
    );
}

