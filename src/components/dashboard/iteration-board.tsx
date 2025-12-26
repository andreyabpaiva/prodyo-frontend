"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IterationTaskList } from "./iteration-task-list";
import type { ModelsProject, ModelsIteration } from "@/apis/data-contracts";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { taskService } from "@/services/task";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIterationId, setActiveIterationsId } from "@/store/iterationSlice";
import { projectService } from "@/services/project";
import { iterationService } from "@/services/iteration";
import { Plus, Trash2 } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";

export function IterationBoard({ iterations }: { iterations: ModelsIteration[] }) {
    const dispatch = useAppDispatch();
    const activeIterationId = useAppSelector((state) => state.iteration.activeIterationId);
    const projectId = useAppSelector((state) => state.project.projectId);
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        if (iterations.length > 0) {
            if (!activeIterationId || !iterations.find(iter => iter.id === activeIterationId)) {
                const firstIterationId = iterations[0]?.id;
                if (firstIterationId) {
                    dispatch(setActiveIterationsId(firstIterationId));
                    dispatch(setIterationId(firstIterationId));
                }
            }
        }
    }, [iterations, activeIterationId, dispatch]);

    useEffect(() => {
        if (activeIterationId) {
            dispatch(setIterationId(activeIterationId));
        }
    }, [activeIterationId, dispatch]);

    const activeIteration = useMemo(
        () => iterations.find((iteration) => iteration.id === activeIterationId),
        [iterations, activeIterationId]
    );

    const { data: tasks = [] } = useQuery({
        queryKey: ["tasks", activeIterationId],
        queryFn: () => {
            if (!activeIterationId) {
                throw new Error("Iteration ID is required");
            }
            return taskService.list({ iteration_id: activeIterationId });
        },
        enabled: !!activeIterationId,
    });

    const filteredTasks = useMemo(() => {
        if (!tasks) return [];
        return tasks.filter((task) => {
            const nameMatch = task.name
                ? task.name.toLowerCase().includes(search.toLowerCase())
                : true;
            return nameMatch;
        });
    }, [tasks, search]);

    const activeTasks = activeIterationId ? (filteredTasks as any[]) : [];

    if (!activeIteration) {
        return (
            <div className="fixed inset-0 flex flex-col gap-3 justify-center items-center p-8 text-center text-lg font-semibold bg-[--background]">
                <p>Carregando iteração</p>
                <Spinner fontSize={15} />
            </div>
        );
    }

    return (
        <div className="ml-50 min-h-screen p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">Iteração {activeIteration.number}</h1>
                    <p className="text-sm text-[var(--disabled)]">{activeIteration.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <div className="w-full max-w-sm">
                            <Input
                                className="h-10"
                                placeholder={"Buscar tarefa..."}
                                disabled={tasks === null || tasks.length === 0}
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </div>

                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/projects/${projectId}/delete-iteration/${activeIteration.id}`)}
                        title="Deletar iteração">
                        <Trash2 strokeWidth={2.5} size={18} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        title="Criar iteração"
                        onClick={() => router.push(`/projects/${projectId}/create-iteration`)}
                    >
                        <Plus strokeWidth={2.5} size={18} />
                    </Button>
                </div>
            </div>
            <IterationTaskList
                tasks={activeTasks}
                iterationId={activeIterationId ?? undefined}
            />
        </div>
    );
}

