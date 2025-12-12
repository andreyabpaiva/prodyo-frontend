"use client";

import { useMemo, useState } from "react";
import { IterationSidebar } from "./iteration-sidebar";
import { IterationTaskList } from "./iteration-task-list";
import type { ModelsProject, ModelsIteration } from "@/apis/data-contracts";

type IterationBoardProps = {
    projectId: string;
    project?: ModelsProject;
    iterations: ModelsIteration[];
    tasksByIteration: Record<string, any[]>;
};

export function IterationBoard({ projectId, project, iterations, tasksByIteration }: IterationBoardProps) {
    const [activeIterationId, setActiveIterationId] = useState(iterations[0]?.id);

    const activeIteration = useMemo(
        () => iterations.find((iteration) => iteration.id === activeIterationId),
        [iterations, activeIterationId]
    );

    const activeTasks = activeIterationId ? tasksByIteration[activeIterationId] ?? [] : [];

    if (!activeIteration) {
        return (
            <div className="rounded-[18px] border-[3px] border-[--dark] bg-[--primary] p-8 text-center text-lg font-semibold shadow-[0_6px_0_rgba(0,0,0,0.25)]">
                Nenhuma iteração disponível.
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
                <IterationTaskList tasks={activeTasks} iterationLabel={`Iteração ${activeIteration.number || 0}`} projectId={projectId} />
            </div>
        </>
    );
}

