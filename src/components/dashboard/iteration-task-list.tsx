"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CirclePause, CirclePlay, MoveDown, Plus, Trash2, Upload, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModelsStatusEnum, ModelsTask } from "@/apis/data-contracts";
import { useDispatch } from "react-redux";
import { bugService } from "@/services/bug";
import { improvementService } from "@/services/improvement";
import { taskService } from "@/services/task";
import { userService } from "@/services/user";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { Input } from "../ui/input";
import { TaskExpansionProvider, useTaskExpansion } from "@/contexts/task-expansion-context";

type IterationTaskListProps = {
    tasks: ModelsTask[] | null;
    iterationId?: string;
};

const statusLabels: Record<ModelsStatusEnum, string> = {
    [ModelsStatusEnum.StatusNotStarted]: "NÃO INICIADO",
    [ModelsStatusEnum.StatusInProgress]: "EM PROGRESSO",
    [ModelsStatusEnum.StatusCompleted]: "FINALIZADO",
};

const statusTone: Record<ModelsStatusEnum, string> = {
    [ModelsStatusEnum.StatusNotStarted]: "bg-[#bfbfbf] text-[var(--text)]",
    [ModelsStatusEnum.StatusInProgress]: "bg-[#83B3FF] text-[var(--text)]",
    [ModelsStatusEnum.StatusCompleted]: "bg-[var(--ok)] text-[var(--text)]",
};

export function IterationTaskList({ tasks, iterationId }: IterationTaskListProps) {
    const projectId = useAppSelector((state: RootState) => state.project.projectId);
    const router = useRouter();

    return (
        <TaskExpansionProvider>
            <section>
                <header className="my-5">
                    <div className="flex-col justify-start">
                        <div className="flex gap-1">
                            <MoveDown color="var(--divider)" className="w-4 h-4 items-center justify-center" />
                            <p className="text-xs text-[var(--divider)]">Crie uma nova <u>tarefa</u> aqui</p>
                        </div>
                        <div className="flex mt-3">
                            <Button
                                variant="default"
                                onClick={() => router.push(`/projects/${projectId}/create-task`)}
                            >
                                <Plus strokeWidth={2.5} size={16} />
                                Adicionar tarefa
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="space-y-4">
                    {tasks ? tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            projectId={projectId ?? ""}
                            iterationId={iterationId}
                        />
                    )) : null}
                </div>
            </section>
        </TaskExpansionProvider>
    );
}

function TaskItem({
    task,
    projectId,
    iterationId,
}: {
    task: ModelsTask;
    projectId: string;
    iterationId?: string;
}) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [pointsValue, setPointsValue] = useState(task.points?.toString() ?? "0");
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(task.timer ? Number(task.timer) : 0);
    const { expandedTaskId, toggleTask } = useTaskExpansion();

    const { data: bugs = [] } = useQuery({
        queryKey: ["bugs", task.id],
        queryFn: () => {
            if (!task.id) {
                throw new Error("Task ID is required");
            }
            return bugService.list({ task_id: task.id });
        },
        enabled: !!task.id && expandedTaskId === task.id,
    });

    const { data: improvements = [] } = useQuery({
        queryKey: ["improvements", task.id],
        queryFn: () => {
            if (!task.id) {
                throw new Error("Task ID is required");
            }
            return improvementService.list({ task_id: task.id });
        },
        enabled: !!task.id && expandedTaskId === task.id,
    });

    const { data: usersData, isLoading: isLoadingUsers } = useQuery({
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
        enabled: !!projectId && isAssigneeOpen,
    });

    const users = usersData?.data || usersData?.users || (Array.isArray(usersData) ? usersData : []);

    const updateTaskMutation = useMutation({
        mutationFn: async ({ assigneeId, status, points, timer }: { assigneeId?: string; status?: string, points?: number, timer?: string }) => {
            if (!task.id) {
                throw new Error("Task ID is required");
            }
            return await taskService.patch(
                task.id, {
                ...(assigneeId !== undefined && { assignee_id: assigneeId || undefined }),
                ...(status !== undefined && { status }),
                ...(points !== undefined && { points }),
                ...(timer !== undefined && { timer }),
            });
        },
        onSuccess: async () => {
            const taskIterationId = task.iteration_id || iterationId;
            if (taskIterationId) {
                await queryClient.refetchQueries({ queryKey: ["tasks", taskIterationId] });
            }
            setIsAssigneeOpen(false);
            setIsStatusOpen(false);
        },
        onError: (error) => {
            console.error("Error updating task:", error);
        },
    });

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isTimerRunning) {
            interval = setInterval(() => {
                setElapsedSeconds((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerRunning]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAssigneeSelect = (userId: string) => {
        updateTaskMutation.mutate({ assigneeId: userId });
    };

    const handleStatusSelect = (status: ModelsStatusEnum) => {
        updateTaskMutation.mutate({ status });
    };

    const handlePointsChange = (points: number) => {
        updateTaskMutation.mutate({ points });
    };

    const toggleTimer = () => {
        if (isTimerRunning) {
            updateTaskMutation.mutate({ timer: elapsedSeconds.toString() });
        }
        setIsTimerRunning(!isTimerRunning);
    };

    return (
        <div className="rounded-[18px] border-[3px] border-[var(--dark)] bg-[var(--primary)] px-4 py-3 shadow-[0_4px_0_rgba(0,0,0,0.15)]">
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--divider)]">
                            {formatTime(elapsedSeconds)}
                        </span>
                        <button onClick={toggleTimer}>
                            {isTimerRunning ? (
                                <CirclePause size={18} className="text-[var(--divider)] cursor-pointer" />
                            ) : (
                                <CirclePlay size={18} className="text-[var(--divider)] cursor-pointer" />
                            )}
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold">{task.name}</p>
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--dark)] text-sm font-bold text-[var(--primary)]">
                                <input
                                    type="text"
                                    value={pointsValue}
                                    inputMode="numeric"
                                    onChange={(e) => setPointsValue(e.target.value.replace(/\D/g, ''))}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handlePointsChange(Number(pointsValue));
                                            e.currentTarget.blur();
                                        }
                                    }}
                                    className="w-6 bg-transparent text-center outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div
                        className="flex items-center gap-2 rounded-full border-[2px] border-[var(--dark)] bg-[var(--primary)] px-3 py-1 cursor-pointer hover:bg-[var(--background)] transition-colors"
                        onClick={() => setIsAssigneeOpen(!isAssigneeOpen)}
                    >
                        <UserRound size={16} />
                        <span className="text-sm font-semibold">
                            {task.assignee?.name || "Sem atribuição"}
                        </span>
                    </div>
                    {isAssigneeOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsAssigneeOpen(false)}
                            />
                            <div className="absolute top-full left-0 mt-2 z-20 w-48 rounded-[12px] border-[3px] border-[var(--dark)] bg-[var(--primary)] shadow-lg max-h-60 overflow-y-auto">
                                {isLoadingUsers ? (
                                    <div className="px-4 py-2 text-sm text-[var(--disabled)]">
                                        Carregando...
                                    </div>
                                ) : users.length === 0 ? (
                                    <div className="px-4 py-2 text-sm text-[var(--disabled)]">
                                        Nenhum usuário encontrado
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleAssigneeSelect("")}
                                            className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-[var(--background)] transition-colors ${!task.assignee?.id ? "bg-[var(--modal)]" : ""
                                                }`}
                                        >
                                            Sem atribuição
                                        </button>
                                        {users.map((user: any) => (
                                            <button
                                                key={user.id}
                                                type="button"
                                                onClick={() => handleAssigneeSelect(user.id)}
                                                disabled={updateTaskMutation.isPending}
                                                className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-[var(--background)] transition-colors ${task.assignee?.id === user.id ? "bg-[var(--modal)]" : ""
                                                    } ${updateTaskMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                {user.name}
                                            </button>
                                        ))}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {/* <Button variant="outline" size="icon" className="rounded-full border-[2px] border-[var(--dark)]">
                    <Upload strokeWidth={2.5} size={18} />
                </Button> */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleTask(task.id ?? "")}
                    className="rounded-full border-[2px] border-[var(--dark)]"
                >
                    {expandedTaskId === task.id ? (
                        <ChevronUp strokeWidth={2.5} size={18} />
                    ) : (
                        <ChevronDown strokeWidth={2.5} size={18} />
                    )}
                </Button>

                <div className="relative">
                    <Badge
                        className={`rounded-full border-[2px] border-[var(--dark)] px-4 py-1 text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity ${task.status ? statusTone[task.status as ModelsStatusEnum] || "" : ""} ${updateTaskMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => !updateTaskMutation.isPending && setIsStatusOpen(!isStatusOpen)}
                    >
                        {task.status ? statusLabels[task.status as ModelsStatusEnum] || task.status : ""}
                    </Badge>
                    {isStatusOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsStatusOpen(false)}
                            />
                            <div className="absolute top-full right-0 mt-2 z-20 w-40 rounded-[12px] border-[3px] border-[var(--dark)] bg-[var(--primary)] shadow-lg overflow-hidden">
                                {Object.entries(statusLabels).map(([status, label], index) => (
                                    <button
                                        key={status}
                                        type="button"
                                        onClick={() => handleStatusSelect(status as ModelsStatusEnum)}
                                        disabled={updateTaskMutation.isPending}
                                        className={`w-full text-left px-4 py-2 text-sm cursor-pointer font-semibold transition-colors ${statusTone[status as ModelsStatusEnum] || ""
                                            } ${updateTaskMutation.isPending ? "opacity-50 cursor-not-allowed" : ""} ${index === 0 ? "rounded-t-[9px]" : ""
                                            } ${index === Object.entries(statusLabels).length - 1 ? "rounded-b-[9px]" : ""
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedTaskId === task.id ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-4">
                    <div>
                        <p className="mt-1 text-sm text-[var(--text)]">{task.description}</p>
                    </div>

                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <p className="text-sm font-semibold underline">Melhorias</p>
                            <button
                                className="rounded-full border-[2px] border-[var(--dark)] cursor-pointer"
                                aria-label="Adicionar melhoria"
                                onClick={() => router.push(`/projects/${projectId}/create-improvement?taskId=${task.id}`)}
                            >
                                <Plus size={16} strokeWidth={3} />
                            </button>
                        </div>
                        {improvements && improvements.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {improvements.map((improvement) => (
                                    <div
                                        key={improvement.id}
                                        className="cursor-pointer rounded-[16px] border-[2px] border-[var(--dark)] bg-[var(--alert)] px-4 py-1 text-sm font-semibold shadow-[3px_3px_0px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,0.25)]"
                                        title={improvement.description ?? ""}
                                    >
                                        <span className="mr-3">
                                            {improvement.description && improvement.description.length > 20
                                                ? improvement.description.slice(0, 20) + "..."
                                                : improvement.description ?? ""}
                                        </span>
                                        <span className="text-xs font-bold">
                                            {/* {improvement.loggedAt.split("T")[1]?.slice(0, 8)} */}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-[var(--disabled)]">Nenhuma melhoria registrada</p>
                        )}
                    </div>

                    <div>
                        <div className="mb-2 flex items-center gap-3">
                            <p className="text-sm font-semibold underline">Bugs</p>
                            <button
                                className="rounded-full border-[2px] border-[var(--dark)] cursor-pointer"
                                aria-label="Adicionar bug"
                                onClick={() => router.push(`/projects/${projectId}/create-bug?taskId=${task.id}`)}
                            >
                                <Plus size={16} strokeWidth={3} />
                            </button>
                        </div>
                        {bugs && bugs.length > 0 ? (
                            <div className="flex flex-wrap gap-3 pb-1">
                                {bugs.map((bug) => (
                                    <div
                                        key={bug.id}
                                        className="cursor-pointer rounded-[16px] border-[2px] border-[var(--dark)] bg-[var(--critic)] px-4 py-1 text-sm font-semibold text-[var(--primary)] shadow-[3px_3px_0px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,0.25)]"
                                        title={bug.description ?? ""}
                                    >
                                        <span className="mr-3" title={bug.description ?? ""}>
                                            {bug.description && bug.description.length > 20
                                                ? bug.description.slice(0, 20) + "..."
                                                : bug.description ?? ""}
                                        </span>
                                        <span className="text-xs font-bold">
                                            {/* {typeof bug.loggedAt === "string" && bug.loggedAt.includes("T")
                                                ? bug.loggedAt.split("T")[1]?.slice(0, 8)
                                                : ""} */}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-[var(--disabled)]">Nenhum bug registrado</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

