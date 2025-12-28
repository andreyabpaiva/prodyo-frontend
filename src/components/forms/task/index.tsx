"use client";

import { X, ArrowDown, CornerRightDown, MoveDownLeft, MoveDownRight, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskStatus } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { UserSelect } from "@/components/utils/UserSelect";
import { taskService } from "@/services/task";
import type { HandlersCreateTaskRequest } from "@/apis/data-contracts";
import { useAppSelector } from "@/store/hooks";

type CreateTaskModalProps = {
    projectId: string;
    iterationId?: string;
};

type TaskFormValues = {
    name: string;
    description: string;
    points: number;
    assigneeId?: string;
};

const statusClasses: Record<TaskStatus, string> = {
    NOT_STARTED: "bg-[#B8B8B8] text-[var(--dark)]",
    IN_PROGRESS: "bg-[#83B3FF] text-[var(--dark)]",
    COMPLETED: "bg-[var(--ok)] text-[var(--dark)]",
};

const statusLabels: Record<TaskStatus, string> = {
    NOT_STARTED: "NÃO INICIADO",
    IN_PROGRESS: "EM PROGRESSO",
    COMPLETED: "FINALIZADO",
};

export default function CreateTaskForm({ projectId }: CreateTaskModalProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const activeIterationId = useAppSelector((state) => state.iteration.activeIterationId);

    const form = useForm<TaskFormValues>({
        defaultValues: {
            name: "",
            description: "",
            points: 0,
            assigneeId: undefined,
        },
    });

    const status: TaskStatus = "NOT_STARTED";

    const mutation = useMutation({
        mutationFn: async (data: TaskFormValues) => {
            const payload: HandlersCreateTaskRequest = {
                name: data.name || undefined,
                description: data.description || undefined,
                iteration_id: activeIterationId || undefined,
                assignee_id: data.assigneeId || undefined,
                status: status,
                points: data.points || undefined  
            };
            
            return await taskService.create(payload);
        },
        onSuccess: async () => {
            if (activeIterationId) {
                await queryClient.refetchQueries({ queryKey: ["tasks", activeIterationId] });
            }
            form.reset();
            router.back();
        },
        onError: (error) => {
            console.error("Error creating task:", error);
        },
    });

    const handleClose = () => {
        router.back();
    };

    const onSubmit = (data: TaskFormValues) => {
        mutation.mutate(data);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={handleClose}
            />

            <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] border-[3px] border-[var(--dark)] bg-[var(--primary)] px-10 py-8">
                <button
                    onClick={handleClose}
                    className="absolute right-6 top-6 text-[--dark] hover:opacity-70 transition-opacity cursor-pointer"
                >
                    <X size={24} strokeWidth={2.5} />
                </button>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center gap-3">
                        <Badge className={`${statusClasses[status]} rounded-full border-[3px] border-[var(--dark)] px-6 py-1 text-sm font-bold`}>
                            {statusLabels[status]}
                        </Badge>
                        <UserSelect
                            value={form.watch("assigneeId")}
                            onChange={(value) => form.setValue("assigneeId", value)}
                        />
                    </div>
                    <div className="flex justify-end gap-1">
                        <p className="text-xs text-[var(--divider)]">selecione a pontuação da tarefa</p>	
                        <MoveDown color="var(--divider)" className="w-4 h-4 items-center justify-center" />
                    </div>

                    <div className="mt-6 flex items-center">
                        <input
                            type="text"
                            {...form.register("name")}
                            placeholder="Digite o nome da tarefa..."
                            className="flex-1 bg-transparent text-3xl font-bold outline-none placeholder:text-[var(--divider)]"
                        />
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--dark)] text-sm font-bold text-[var(--primary)]">
                            <input
                                type="text"
                                inputMode="numeric"
                                {...form.register("points", {
                                    valueAsNumber: true,
                                    onChange: (e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        form.setValue("points", Number(value) || 0);
                                    },
                                })}
                                className="w-6 bg-transparent text-center outline-none"
                            />
                        </div>
                    </div>

                    <textarea
                        placeholder="Descrição"
                        {...form.register("description")}
                        className="mt-6 h-36 w-full rounded-[16px] border-[3px] border-[var(--dark)] bg-[var(--modal)] px-6 py-4 text-md text-[var(--dark)] outline-none resize-none"
                    />

                    {mutation.isError && (
                        <div className="mt-4 p-3 rounded-[12px] bg-red-100 border-2 border-red-500">
                            <p className="text-sm text-red-700 font-semibold text-center">
                                Erro ao criar tarefa. Tente novamente.
                            </p>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Button
                            type="submit"
                            variant="default"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Criando..." : "Criar Tarefa"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

