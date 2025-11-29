"use client";

import { useMemo, useState } from "react";
import { Iteration, Task } from "@/types/domain";
import { IterationSidebar } from "./iteration-sidebar";
import { IterationTaskList } from "./iteration-task-list";

type IterationBoardProps = {
    projectId: string;
    iterations: Iteration[];
    tasksByIteration: Record<string, Task[]>;
};

export function IterationBoard({ projectId, iterations, tasksByIteration }: IterationBoardProps) {
    const [activeIterationId, setActiveIterationId] = useState(iterations[0]?.id);

    const activeIteration = useMemo(
        () => iterations.find((iteration) => iteration.id === activeIterationId),
        [iterations, activeIterationId]
    );

    const activeTasks = activeIterationId ? tasksByIteration[activeIterationId] ?? [] : [];

    if (!activeIteration) {
        return (
            <div className="rounded-[18px] border-[3px] border-[var(--dark)] bg-[var(--primary)] p-8 text-center text-lg font-semibold shadow-[0_6px_0_rgba(0,0,0,0.25)]">
                Nenhuma iteração disponível.
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <IterationSidebar
                iterations={iterations}
                activeIterationId={activeIterationId}
                projectId={projectId}
                onSelectIteration={setActiveIterationId}
            />
            <div className="flex-1 px-4 py-8">
                <IterationTaskList tasks={activeTasks} iterationLabel={`Iteração ${activeIteration.number}`} />
            </div>
        </div>
    );
}

