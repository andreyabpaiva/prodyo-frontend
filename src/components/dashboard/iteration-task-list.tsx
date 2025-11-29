"use client";

import { useMemo, useState } from "react";
import { Task } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash2, Upload, UserRound } from "lucide-react";

type IterationTaskListProps = {
    tasks: Task[];
    iterationLabel: string;
};

type SearchState = {
    name: string;
    status: string;
    points: string;
};

const statusLabels = {
    NOT_STARTED: "NÃO INICIADO",
    IN_PROGRESS: "EM PROGRESSO",
    COMPLETED: "FINALIZADO",
};

const statusTone: Record<Task["status"], string> = {
    NOT_STARTED: "bg-[#bfbfbf] text-[var(--text)]",
    IN_PROGRESS: "bg-[#83B3FF] text-[var(--text)]",
    COMPLETED: "bg-[var(--ok)] text-[var(--text)]",
};

export function IterationTaskList({ tasks, iterationLabel }: IterationTaskListProps) {
    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(tasks[0]?.id ?? null);
    const [search, setSearch] = useState<SearchState>({ name: "", status: "", points: "" });

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const nameMatch = task.name.toLowerCase().includes(search.name.toLowerCase());
            const statusMatch = statusLabels[task.status].toLowerCase().includes(search.status.toLowerCase());
            const pointsMatch = search.points ? String(task.points).includes(search.points) : true;
            return nameMatch && statusMatch && pointsMatch;
        });
    }, [tasks, search]);

    return (
        <section className="flex-1 rounded-[24px] border-[3px] border-[var(--dark)] bg-[var(--primary)] p-6 shadow-[0_6px_0_rgba(0,0,0,0.25)]">
            <header className="mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">{iterationLabel}</h1>
                    <Badge className="rounded-full border-[2px] border-[var(--dark)] px-3 py-0.5 text-xs font-bold">1</Badge>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {["Nome", "Status", "Pontos"].map((label, index) => (
                        <input
                            key={label}
                            placeholder={label}
                            value={Object.values(search)[index]}
                            onChange={(event) => {
                                const entries: Array<keyof SearchState> = ["name", "status", "points"];
                                setSearch((prev) => ({ ...prev, [entries[index]]: event.target.value }));
                            }}
                            className="rounded-[20px] border-[3px] border-[var(--dark)] bg-[var(--background)] px-4 py-2 text-sm font-semibold text-[var(--disabled)] outline-none"
                        />
                    ))}
                </div>
            </header>

            <div className="space-y-4">
                {filteredTasks.map((task) => {
                    const isExpanded = expandedTaskId === task.id;

                    return (
                        <div
                            key={task.id}
                            className="rounded-[18px] border-[3px] border-[var(--dark)] bg-[var(--primary)] px-4 py-3 shadow-[0_4px_0_rgba(0,0,0,0.15)]"
                        >
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex flex-1 flex-col">
                                    <div className="flex items-center gap-3">
                                        <p className="text-lg font-semibold">{task.name}</p>
                                        <Badge className="rounded-full border-[2px] border-[var(--dark)] px-3 py-0.5 text-xs font-bold">{task.points}</Badge>
                                    </div>
                                    <span className="text-sm text-[var(--divider)]">{task.totalTime}</span>
                                </div>

                                <Badge className={`rounded-full border-[2px] border-[var(--dark)] px-4 py-1 text-xs font-bold ${statusTone[task.status]}`}>
                                    {statusLabels[task.status]}
                                </Badge>

                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="rounded-full border-[2px] border-[var(--dark)]">
                                        <UserRound />
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full border-[2px] border-[var(--dark)]">
                                        <Upload strokeWidth={2.5} />
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full border-[2px] border-[var(--dark)]">
                                        <Trash2 strokeWidth={2.5} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                                        className="rounded-full border-[2px] border-[var(--dark)]"
                                    >
                                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                                    </Button>
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="mt-4 space-y-4 rounded-[14px] border-[2px] border-[var(--dark)] bg-[var(--background)] p-4">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--divider)]">Descrição</p>
                                        <p className="mt-2 text-sm text-[var(--text)]">{task.description}</p>
                                    </div>

                                    {task.improvements.length > 0 && (
                                        <div>
                                            <div className="mb-2 flex items-center gap-3">
                                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--divider)]">Melhorias</p>
                                                <Badge className="rounded-full border-[2px] border-[var(--dark)] bg-[var(--alert)] text-[var(--dark)]">
                                                    +
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {task.improvements.map((improvement) => (
                                                    <div
                                                        key={improvement.id}
                                                        className="rounded-full border-[2px] border-[var(--dark)] bg-[var(--alert)] px-4 py-1 text-sm font-semibold"
                                                    >
                                                        <span className="mr-3">{improvement.description}</span>
                                                        <span className="text-xs font-bold">{improvement.loggedAt.split("T")[1]?.slice(0, 8)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {task.bugs.length > 0 && (
                                        <div>
                                            <div className="mb-2 flex items-center gap-3">
                                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--divider)]">Bugs</p>
                                                <Badge className="rounded-full border-[2px] border-[var(--dark)] bg-[var(--critic)] text-[var(--primary)]">
                                                    +
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {task.bugs.map((bug) => (
                                                    <div
                                                        key={bug.id}
                                                        className="rounded-full border-[2px] border-[var(--dark)] bg-[var(--critic)] px-4 py-1 text-sm font-semibold text-[var(--primary)]"
                                                    >
                                                        <span className="mr-3">{bug.description}</span>
                                                        <span className="text-xs font-bold">{bug.loggedAt.split("T")[1]?.slice(0, 8)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

