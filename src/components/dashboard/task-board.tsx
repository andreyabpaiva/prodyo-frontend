"use client";

import { Task } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BugDialog, ImprovementDialog, TaskDetailsDialog } from "@/components/dashboard/modals";
import { Plus, Trash2, Upload, UserRound } from "lucide-react";

const statusLabels = {
    NOT_STARTED: "NÃO INICIADO",
    IN_PROGRESS: "EM PROGRESSO",
    COMPLETED: "FINALIZADO",
};

const statusTone: Record<Task["status"], string> = {
    NOT_STARTED: "bg-[#B8B8B8] text-[var(--dark)]",
    IN_PROGRESS: "bg-[#83B3FF] text-[var(--dark)]",
    COMPLETED: "bg-[var(--ok)] text-[var(--dark)]",
};

function EntryChip({
    label,
    timestamp,
    tone = "bg-[var(--alert)] text-[var(--dark)]",
}: {
    label: string;
    timestamp?: string;
    tone?: string;
}) {
    return (
        <div className={`rounded-full border-[3px] border-[var(--dark)] px-6 py-3 text-sm font-semibold shadow-sm ${tone}`}>
            <div className="flex items-center justify-between gap-4">
                <span>{label}</span>
                {timestamp && <span className="text-xs font-bold">{timestamp}</span>}
            </div>
        </div>
    );
}

export function TaskBoard({ tasks }: { tasks: Task[] }) {
    const [hero, ...rest] = tasks;

    return (
        <section className="flex-1 space-y-12">
            {hero && (
                <div className="rounded-[32px] border-[3px] border-[var(--dark)] bg-[var(--primary)] p-8 shadow-[8px_8px_0_rgba(0,0,0,0.35)]">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-lg font-bold">
                            <span>{hero.totalTime}</span>
                            <Badge className={`rounded-full border-[3px] border-[var(--dark)] px-5 py-1 text-xs font-bold ${statusTone[hero.status]}`}>
                                {statusLabels[hero.status]}
                            </Badge>
                            <Badge className="rounded-full border-[3px] border-[var(--dark)] px-3 py-1 text-xs font-bold">
                                {hero.points}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button size="icon" variant="outline" className="rounded-full border-[3px] border-[var(--dark)]">
                                <Upload strokeWidth={2.5} />
                            </Button>
                            <Button size="icon" variant="outline" className="rounded-full border-[3px] border-[var(--dark)]">
                                <Trash2 strokeWidth={2.5} />
                            </Button>
                            <TaskDetailsDialog
                                task={hero}
                                trigger={
                                    <Button className="rounded-full border-[3px] border-[var(--dark)] text-sm font-bold uppercase tracking-[0.3em]">
                                        Ver tarefa
                                    </Button>
                                }
                            />
                        </div>
                    </div>

                    <div className="mt-6 space-y-2">
                        <p className="text-3xl font-bold">{hero.name}</p>
                        <p className="text-sm text-[var(--divider)]">{hero.description}</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-8">
                        <div>
                            <div className="mb-4 flex items-center gap-3">
                                <h3 className="text-xl font-bold uppercase tracking-[0.3em]">Melhorias</h3>
                                <ImprovementDialog
                                    title="Melhoria 1"
                                    trigger={
                                        <Button size="icon" variant="outline" className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--alert)]">
                                            <Plus />
                                        </Button>
                                    }
                                />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {hero.improvements.map((entry) => (
                                    <EntryChip
                                        key={entry.id}
                                        label={`Melhoria ${entry.number}`}
                                        timestamp={entry.loggedAt.split("T")[1]?.slice(0, 8)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="mb-4 flex items-center gap-3">
                                <h3 className="text-xl font-bold uppercase tracking-[0.3em]">Bugs</h3>
                                <BugDialog
                                    title="Bug 1"
                                    trigger={
                                        <Button size="icon" variant="outline" className="rounded-full border-[3px] border-[var(--dark)] bg-[var(--critic)] text-[var(--primary)]">
                                            <Plus />
                                        </Button>
                                    }
                                />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {hero.bugs.map((entry) => (
                                    <EntryChip
                                        key={entry.id}
                                        label={`Bug ${entry.number}`}
                                        timestamp="00:00:00"
                                        tone="bg-[var(--critic)] text-[var(--primary)]"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3 text-lg font-semibold">
                        <UserRound />
                        {hero.assignee.name}
                    </div>
                </div>
            )}

            <div className="rounded-[32px] border-[3px] border-[var(--primary)]/20 bg-[var(--dark)]/30 p-6">
                <div className="grid grid-cols-[70px_1fr_160px_160px_80px] items-center border-b-[3px] border-[var(--primary)] px-4 py-3 text-sm font-bold uppercase tracking-[0.3em] text-[var(--primary)]">
                    <span>#</span>
                    <span>Nome</span>
                    <span>Status</span>
                    <span>Pontos</span>
                    <span></span>
                </div>
                {rest.map((task, index) => (
                    <div
                        key={task.id}
                        className="grid grid-cols-[70px_1fr_160px_160px_80px] items-center border-b-[1px] border-white/10 px-4 py-4 text-[var(--primary)]"
                    >
                        <span className="text-lg font-bold">{index + 1}</span>
                        <div>
                            <p className="font-semibold">{task.name}</p>
                            <p className="text-sm text-[var(--divider)]">{task.totalTime}</p>
                        </div>
                        <Badge className={`rounded-full border-[3px] border-[var(--dark)] px-5 py-1 text-xs font-bold ${statusTone[task.status]}`}>
                            {statusLabels[task.status]}
                        </Badge>
                        <span className="text-lg font-bold">{task.points}</span>
                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="outline" className="rounded-full border-[3px] border-[var(--dark)]">
                                <UserRound size={18} />
                            </Button>
                            <Button size="icon" variant="outline" className="rounded-full border-[3px] border-[var(--dark)]">
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


