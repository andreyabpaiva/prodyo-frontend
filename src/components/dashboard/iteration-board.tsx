"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IterationSidebar } from "./iteration-sidebar";
import { IterationTaskList } from "./iteration-task-list";
import type { ModelsProject, ModelsIteration } from "@/apis/data-contracts";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { taskService } from "@/services/task";
import { useAppDispatch } from "@/store/hooks";
import { setIterationId } from "@/store/iterationSlice";

type IterationBoardProps = {
    projectId: string;
    project?: ModelsProject;
    iterations: ModelsIteration[];
    tasksByIteration: Record<string, any[]>;
};

export function IterationBoard({ projectId, iterations, tasksByIteration }: IterationBoardProps) {
    const [activeIterationId, setActiveIterationId] = useState(iterations[0]?.id);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (iterations.length > 0) {
            if (!activeIterationId || !iterations.find(iter => iter.id === activeIterationId)) {
                const firstIterationId = iterations[0]?.id;
                setActiveIterationId(firstIterationId);
                if (firstIterationId) {
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

    const activeTasks = activeIterationId ? (tasks as any[]) : [];

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
        <>
            <IterationSidebar
                iterations={iterations}
                activeIterationId={activeIterationId}
                projectId={projectId}
                onSelectIteration={setActiveIterationId}
            />
            <div className="ml-50 min-h-screen px-4 py-8">
                <IterationTaskList
                    tasks={activeTasks}
                    iterationLabel={`Iteração ${activeIteration.number || 0}`}
                    projectId={projectId}
                    iterationId={activeIteration.id}
                />
            </div>
        </>
    );
}

