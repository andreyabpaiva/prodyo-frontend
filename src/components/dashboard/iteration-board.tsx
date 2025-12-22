"use client";

import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { IterationTaskList } from "./iteration-task-list";
import type { ModelsProject, ModelsIteration } from "@/apis/data-contracts";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { taskService } from "@/services/task";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIterationId, setActiveIterationsId } from "@/store/iterationSlice";

type IterationBoardProps = {
    projectId: string;
    project?: ModelsProject;
    iterations: ModelsIteration[];
    tasksByIteration: Record<string, any[]>;
};

export function IterationBoard({ projectId, iterations, tasksByIteration }: IterationBoardProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const activeIterationsId = useAppSelector((state) => state.iteration.activeIterationsId);

    // Set default iteration if none is active
    useEffect(() => {
        if (iterations.length > 0) {
            if (!activeIterationsId || !iterations.find(iter => iter.id === activeIterationsId)) {
                const firstIterationId = iterations[0]?.id;
                if (firstIterationId) {
                    dispatch(setActiveIterationsId(firstIterationId));
                    dispatch(setIterationId(firstIterationId));
                }
            }
        }
    }, [iterations, activeIterationsId, dispatch]);

    // Sync iterationId with activeIterationsId
    useEffect(() => {
        if (activeIterationsId) {
            dispatch(setIterationId(activeIterationsId));
        }
    }, [activeIterationsId, dispatch]);

    const activeIteration = useMemo(
        () => iterations.find((iteration) => iteration.id === activeIterationsId),
        [iterations, activeIterationsId]
    );

    const { data: tasks = [] } = useQuery({
        queryKey: ["tasks", activeIterationsId],
        queryFn: () => {
            if (!activeIterationsId) {
                throw new Error("Iteration ID is required");
            }
            return taskService.list({ iteration_id: activeIterationsId });
        },
        enabled: !!activeIterationsId,
    });

    const activeTasks = activeIterationsId ? (tasks as any[]) : [];

    if (iterations.length === 0) {
        return (
            <div className="fixed inset-0 flex flex-col gap-4 justify-center items-center p-8 text-center text-lg font-semibold bg-[--background]">
                Nenhuma iteração disponível.

                <Button
                    onClick={() =>
                        router.push(`/projects/${projectId}/create-iteration`)
                    }>
                    Criar iteração
                </Button>
            </div>
        );
    }

    if (!activeIteration) {
        return (
            <div className="fixed inset-0 flex flex-col gap-4 justify-center items-center p-8 text-center text-lg font-semibold bg-[--background]">
                Carregando iteração...
            </div>
        );
    }

    return (
        <div className="ml-50 min-h-screen px-4 py-8">
            <IterationTaskList
                tasks={activeTasks}
                iterationDescription={activeIteration.description}
                iterationLabel={`Iteração ${activeIteration.number || 0}`}
                projectId={projectId}
                iterationId={activeIteration.id}
            />
        </div>
    );
}

