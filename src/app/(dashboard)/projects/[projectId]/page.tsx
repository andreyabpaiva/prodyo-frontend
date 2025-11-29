import { mockData } from "@/data/mock";
import { notFound } from "next/navigation";
import { IterationBoard } from "@/components/dashboard/iteration-board";

type ProjectDetailProps = {
    params: { projectId: string };
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
    const project = mockData.getProjectById(params.projectId);

    if (!project) {
        notFound();
    }

    const iterations = mockData.getIterationsByProject(project.id);
    const tasksByIteration = iterations.reduce<Record<string, ReturnType<typeof mockData.getTasksByIteration>>>((acc, iteration) => {
        acc[iteration.id] = mockData.getTasksByIteration(iteration.id);
        return acc;
    }, {});

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
            <IterationBoard projectId={project.id} iterations={iterations} tasksByIteration={tasksByIteration} />
        </main>
    );
}


