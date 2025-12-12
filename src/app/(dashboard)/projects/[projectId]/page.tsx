"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { IterationBoard } from "@/components/dashboard/iteration-board";
import { projectService } from "@/services/project";
import { iterationService } from "@/services/iteration";
import type { ModelsProject } from "@/apis/data-contracts";
import type { ModelsIteration } from "@/apis/data-contracts";

type ProjectDetailProps = {
    params: { projectId: string };
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
    const { data: project, isLoading: isLoadingProject, error: projectError } = useQuery({
        queryKey: ["projectDetail", params.projectId],
        queryFn: () => projectService.getDetail({ id: params.projectId }),
    });

    const { data: iterations = [], isLoading: isLoadingIterations } = useQuery({
        queryKey: ["iterations", params.projectId],
        queryFn: () => iterationService.list({ project_id: params.projectId }),
        enabled: !!params.projectId,
    });

    const isLoading = isLoadingProject || isLoadingIterations;

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[--background] text-[--text] flex items-center justify-center">
                <div className="text-lg font-semibold">Carregando projeto...</div>
            </main>
        );
    }

    if (projectError || !project) {
        notFound();
    }

    const tasksByIteration: Record<string, any[]> = {};
    iterations.forEach((iteration) => {
        if (iteration.id && iteration.tasks) {
            tasksByIteration[iteration.id] = iteration.tasks;
        }
    });

    return (
        <main className="min-h-screen bg-[--background] text-[--text]">
            <IterationBoard 
                projectId={project.id || params.projectId} 
                project={project}
                iterations={iterations} 
                tasksByIteration={tasksByIteration} 
            />
        </main>
    );
}


