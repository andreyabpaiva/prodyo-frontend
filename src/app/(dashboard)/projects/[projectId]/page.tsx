"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { IterationBoard } from "@/components/dashboard/iteration-board";
import { projectService } from "@/services/project";
import { iterationService } from "@/services/iteration";

type ProjectDetailProps = {
    params: Promise<{ projectId: string }>;
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
    const { projectId } = use(params);
    
    const { data: project, isLoading: isLoadingProject, error: projectError } = useQuery({
        queryKey: ["projectDetail", projectId],
        queryFn: () => projectService.getDetail({ id: projectId }),
    });

    const { data: iterations = [], isLoading: isLoadingIterations } = useQuery({
        queryKey: ["iterations", projectId],
        queryFn: () => iterationService.list({ project_id: projectId }),
        enabled: !!projectId,
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
    const iterationsList = iterations || [];
    iterationsList.forEach((iteration) => {
        if (iteration.id && iteration.tasks) {
            tasksByIteration[iteration.id] = iteration.tasks;
        }
    });

    return (
        <main className="min-h-screen bg-[--background] text-[--text]">
            <IterationBoard 
                projectId={project.id || projectId} 
                project={project}
                iterations={iterationsList} 
                tasksByIteration={tasksByIteration} 
            />
        </main>
    );
}


